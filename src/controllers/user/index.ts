import { Request, Response } from "express";
import User from "../../models/user";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

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

}
