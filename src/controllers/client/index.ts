import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Address, Client, ClientAddress } from "../../models";

export class ClientController {
  public validate(method: string) {
    switch (method) {
      case "create": {
        return [
          check("name")
            .not()
            .isEmpty()
            .withMessage("Client business name is required"),
          check("country")
            .not()
            .isEmpty()
            .withMessage("Business country is required"),
          check("uniqueId").custom(async (value) => {
            const client = await Client.findOne({
              where: {
                uniqueId: value,
              },
            });
            if (client) return Promise.reject("Unique Id Already in use ");
          }),
        ];
      }
      case "update": {
        return [
          check("clientId")
            .not()
            .isEmpty()
            .withMessage("Client Id is required"),
          check("name")
            .not()
            .isEmpty()
            .withMessage("Client business name is required"),
          check("country")
            .not()
            .isEmpty()
            .withMessage("Business country is required"),
        ];
      }
      case "delete": {
        return [
          check("clientId")
            .not()
            .isEmpty()
            .withMessage("Client Id is required"),
        ];
      }
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      console.log("err", errors);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const client = await Client.create({
        name: req.body.name,
        country: req.body.country,
        logoUrl: req.body.logoUrl,
        email: req.body.email,
        industry: req.body.industry,
        uniqueId: req.body.uniqueId,
        phoneNumber: req.body.phoneNumber,
        aliasName: req.body.aliasName,
        vatRegistrationNumber: req.body.vatRegistrationNumber,
        StoreId: req.user.activeStoreId,
      });

      if (client) {
        if (req.body.address) {
          const address = await Address.create({
            country: req.body.address.country,
            city: req.body.address.city,
            state: req.body.address.state,
            street: req.body.address.street,
            zipCode: req.body.address.zipCode,
            streetAddress: req.body.address.streetAddress,
          });

          if (address) {
            const clientAddress = await ClientAddress.create({
              ClientId: client.id,
              AddressId: address.id,
            });
            return res.status(200).json({
              success: true,
              msg: "Client and address created successfully",
              data: client,
            });
          }
        }
        return res.status(200).json({
          success: true,
          msg: "Client created successfully",
          data: client,
        });
      } else {
        return res.status(404).json({
          success: false,
          msg: "Client not created successfully",
          data: null,
        });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  }

  public async all(req: Request, res: Response) {
    try {
      const clients = await Client.findAll({
        where: { StoreId: req.user.activeStoreId },
        include: [
          {
            model: Address,
            as: "addresses",
          },
        ],
      });
      if (clients) {
        return res
          .status(200)
          .json({ success: true, msg: "Clients found", data: clients });
      } else {
        return res
          .status(404)
          .json({ success: false, msg: "Clients not found", data: null });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      console.log("err", errors);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const client = await Client.findOne({ where: { id: req.body.clientId } });
      if (client) {
        await client.update({
          name: req.body.name,
          country: req.body.country,
          logoUrl: req.body.logoUrl,
          email: req.body.email,
          industry: req.body.industry,
          uniqueId: req.body.uniqueId,
          phoneNumber: req.body.phoneNumber,
          aliasName: req.body.aliasName,
          vatRegistrationNumber: req.body.vatRegistrationNumber,
        });
        return res
          .status(200)
          .json({ success: true, msg: "Updated successFully", data: client });
      } else {
        return res
          .status(404)
          .json({ success: false, msg: "Client not found " });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }
      const deleted = await Client.destroy({
        where: { id: req.body.clientId },
      });
      if (deleted === 1) {
        return res
          .status(200)
          .json({ success: true, message: "Row deleted successfully" });
      } else {
        return res.status(404).json({ success: false, message: "Not deleted" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  }
}
