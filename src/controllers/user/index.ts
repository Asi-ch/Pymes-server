import { Request, Response } from "express";
import User from "../../models/user";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import stripe from "../../lib/stripe";
import { Subscription, UserType } from "../../models";
import Stripe from "stripe";

export class UserController {
  public validate(method: string) {
    switch (method) {
      case "createUser": {
        return [
          check("email")
            .custom(async (value) => {
              const user = await User.findOne({
                where: {
                  email: value,
                },
              });
              if (user) {
                return Promise.reject("Email is already in use");
              }
            })
            .not()
            .isEmpty()
            .withMessage("Email can't be blank")
            .isEmail()
            .withMessage("Email format should be correct"),
          check("password")
            .matches(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
            )
            .withMessage(
              "Password must includes one uppercase, one lowercase,one digit, min length is 8 and max length is 64"
            ),
          check("firstName")
            .not()
            .isEmpty()
            .withMessage("First Name can't be blank"),
          // check("lastName").not().isEmpty().withMessage("Last Name can't be blank"),
        ];
      }
      case "login": {
        return [
          check("email")
            .not()
            .isEmpty()
            .withMessage("Email can't be blank")
            .isEmail()
            .withMessage("Email format should be correct"),
          check("password")
            .not()
            .isEmpty()
            .withMessage("Password can't be blank"),
          // check("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("Password must includes one uppercase, one lowercase, one special character, one digit and min length is 8")
        ];
      }
      case "subscribe": {
        return [
          check("planId")
            .not()
            .isEmpty()
            .withMessage("Please select a plan to subscribe"),
        ];
      }
      case "createStripeCustomer": {
        return [
          check("cardHolderName")
            .not()
            .isEmpty()
            .withMessage("Card Holder Name can't be blank"),
          check("cardExpMonth")
            .not()
            .isEmpty()
            .withMessage("Card Exp Month can't be blank"),
          check("cardExpYear")
            .not()
            .isEmpty()
            .withMessage("Card Exp Year can't be blank"),
          check("cardCvc")
            .not()
            .isEmpty()
            .withMessage("Card CVC can't be blank"),
        ];
      }
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }
      const user = await User.create({
        email: req.body.email.toLowerCase(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
      });

      if (user) {
        res.json({
          success: true,
          data: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        });
      } else {
        res.json({
          success: false,
          errors: [{ msg: "Unable to create User" }],
        });
      }
    } catch (errors) {
      res.status(422).json({
        success: false,
        errors,
      });
    }
  }

  public async signIn(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      console.log("err", errors)
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const user = await User.findOne({
        where: {
          email: req.body.email.toLowerCase(),
        }
      });
      console.log("user", user)

      if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {


        const jwtToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        res.json({
          success: true,
          data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            jwtToken,
          },
        });
      } else {
        res.json({
          success: false,
          errors: [{ msg: "Email or Password is incorrect" }],
        });
      }
    } catch (errors) {
      console.log("final err", errors)
      res.status(422).json({
        success: false,
        errors,
      });
    }
  }


  public async listPlans(req: Request, res: Response) {
    try {
      const plans = await stripe.plans.list({
        limit: 10,
        product: process.env.STRIPE_PRODUCT_ID,
      });
      res.json({
        success: true,
        data: plans.data,
      });
    } catch (errors) {
      res.status(422).json({
        success: false,
        errors,
      });
    }
  }
  public async subscribe(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }
      const { planId } = req.body;
      const user = await User.findOne({
        where: {
          id: req.userId,
        },
      });
      const stripePlan = await stripe.prices.retrieve(planId);
      if (!user.activeSubscriptionId) {
        const subscription = await stripe.subscriptions.create({
          customer: user.stripeCustomerId,
          items: [
            {
              price: planId,
              // price: req.body.priceId ? req.body.priceId : price.id,
              quantity: 1,
              // quantity: req.body.priceId ? 0 : 1
            },
          ],
          trial_from_plan: true,
        });

        const subscriptionData = await Subscription.create({
          UserId: user.id,
          stripeSubscriptionId: subscription.id,
          stripePlanId: planId,
        });

        await User.update(
          {
            activeSubscriptionId: subscription.id
          },
          {
            where: {
              id: req.userId,
            },

          },
        )

        return res.json({
          success: true,
          data: subscriptionData,
        });
      } else {
        return res.status(422).json({
          success: false,
          errors: ["Already have an active subscription please cancel it to resubscribe "],
        });
      }
    } catch (errors) {
      console.log(errors);
      res.status(422).json({
        success: false,
        errors,
      });
    }
  }

  public async createStripeCustomer(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }
      const user = await User.findOne({
        where: {
          id: req.userId,
        },
      });

      const params: Stripe.TokenCreateParams = {
        card: {
          name: req.body.cardHolderName,
          number: req.body.cardNumber,
          exp_month: req.body.cardExpMonth,
          exp_year: req.body.cardExpYear,
          cvc: req.body.cardCvc,
        },
      };

      const token = await stripe.tokens.create(params);

      if (token) {
        const customer = await stripe.customers.create({
          email: user.email,
          source: token.id,
        });

        if (customer) {
          const charge = await stripe.charges.create({
            amount: 100,
            currency: "usd",
            description: "Charge for init",
            customer: customer.id,
            capture: false,
          });

          if (charge && charge.status !== "succeeded") {
            stripe.customers.del(customer.id);
            res.status(422).json({
              success: false,
              errors: [
                {
                  err:
                    "Unable to create a Charge. Please provide valid card information",
                },
              ],
            });
          } else {
            await user.update({ stripeCustomerId: customer.id });
            res.json({
              success: true,
              data: customer,
            });
          }
        }
      }
    } catch (errors) {
      res.status(422).json({
        success: false,
        errors,
      });
    }
  }

}
