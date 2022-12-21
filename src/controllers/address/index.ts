import e, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Address } from "../../models";

export class AddressController {


  public validate(method: string) {
    switch (method) {

      case 'update': {
        return [
          check("addressId")
            .custom(async (value) => {
              const address = await Address.findOne({
                where: {
                  id: value,
                },
              });
              if (!address) {
                return Promise.reject("address id is invalid");
              }
            })
            .not()
            .isEmpty()
            .withMessage("Address Id is required"),
        ]
      }
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const address = await Address.create({
        country: req.body.country,
        city: req.body.city,
        state: req.body.state,
        street: req.body.street,
        zipCode: req.body.zipCode,
        streetAddress: req.body.streetAddress
      })

      if (address) {
        return res.status(200).json({ success: true, data: address })
      } else {
        return res.status(404).json({ success: false, data: null })
      }

    } catch (error) {
      console.log("Error => ", error)
      res.status(500).json({
        success: false,
        error,
      });
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const address = await Address.findOne(
        { where: { id: req.body.addressId }, }
      )
      if (address) {
        await address.update({
          country: req.body.country,
          city: req.body.city,
          state: req.body.state,
          street: req.body.street,
          zipCode: req.body.zipCode,
          streetAddress: req.body.streetAddress
        })
        return res.status(200).json({ success: true, data: address })
      } else {
        return res.status(404).json({ success: false, data: null })
      }

    } catch (error) {
      console.log("Error => ", error)
      res.status(500).json({
        success: false,
        error,
      });
    }
  }


  public async all(req: Request, res: Response) {
    try {
      const addresses = await Address.findAll()
      res.status(200).json({ success: addresses.length > 0 ? true : false, msg: "Addresses", data: addresses })
    } catch (error) {
      console.log("Error => ", error)
      res.status(500).json({
        success: false,
        error,
      });
    }
  }
}