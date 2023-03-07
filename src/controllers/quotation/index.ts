import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { BillType } from "../../lib/types";
import {
  Address,
  Attachment,
  Bill,
  BillAttachment,
  BillContactDetail,
  BillItem,
  BillShippedFrom,
  BillShippedTo,
  BillTransportDetail,
  Client,
  ContactDetail,
  Item,
  Store,
  TransportDetail,
} from "../../models";

export class QuotationController {
  public validate(method: string) {
    switch (method) {
      case "create": {
        return [
          check("quotationNo")
            .custom(async (value) => {
              const bill = await Bill.findOne({
                where: {
                  billNo: value,
                },
              });
              if (bill) {
                return Promise.reject("Bill number is already in use");
              }
            })
            .not()
            .isEmpty()
            .withMessage("Quotation Number is required"),
          check("quotationDate")
            .not()
            .isEmpty()
            .withMessage("Quotation Date is required"),
          check("clientId")
            .not()
            .isEmpty()
            .withMessage("Client id is required"),
          check("items.*.name")
            .not()
            .isEmpty()
            .withMessage("Items.Name is required"),
          check("items.*.quantity")
            .not()
            .isEmpty()
            .withMessage("Items.Quantity is required"),
        ];
      }
      case "update": {
        return [
          check("quotationId")
            .custom(async (value) => {
              const bill = await Bill.findOne({
                where: {
                  id: value,
                },
              });
              if (!bill) {
                return Promise.reject("quotation id is invalid");
              }
            })
            .not()
            .isEmpty()
            .withMessage("Quotation Id is required"),
        ];
      }
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const quotation = await Bill.create({
        billNo: req.body.quotationNo,
        billDate: req.body.quotationDate,
        billType: BillType.Quotation,
        subTitle: req.body.subTitle,
        status: req.body.status,
        StoreId: req.body.storeId ? req.body.storeId : req.user.activeStoreId,
        ClientId: req.body.clientId,
        amount: req.body.amount,
        tax: req.body.tax,
        discount: req.body.discount,
        termsAndConditions: req.body.termsAndConditions,
        notes: req.body.notes,
        signature: req.body.signature,
        emailSent: req.body.emailSent,
      });

      if (quotation) {
        if (req.body.items) {
          await Promise.all(
            req.body.items.map(async (item) => {
              const newItem = await Item.create({
                name: item.name,
                taxRate: item.taxRate,
                quantity: item.quantity,
                rate: item.rate,
                total: item.total,
                totalTax: item.totalTax,
                description: item.description,
              });
              if (newItem) {
                await BillItem.create({
                  ItemId: newItem.id,
                  BillId: quotation.id,
                });
              }
            })
          );
        }

        if (req.body.shippedTo) {
          const shippedTo = await Address.create({
            country: req.body.shippedTo.country,
            city: req.body.shippedTo.city,
            state: req.body.shippedTo.state,
            street: req.body.shippedTo.street,
            zipCode: req.body.shippedTo.zipCode,
            streetAddress: req.body.shippedTo.streetAddress,
          });
          if (shippedTo) {
            await BillShippedTo.create({
              AddressId: shippedTo.id,
              BillId: quotation.id,
            });
          }
        }
        if (req.body.shippedFrom) {
          const shippedFrom = await Address.create({
            country: req.body.shippedFrom.country,
            city: req.body.shippedFrom.city,
            state: req.body.shippedFrom.state,
            street: req.body.shippedFrom.street,
            zipCode: req.body.shippedFrom.zipCode,
            streetAddress: req.body.shippedFrom.streetAddress,
          });
          if (shippedFrom) {
            await BillShippedFrom.create({
              AddressId: shippedFrom.id,
              BillId: quotation.id,
            });
          }
        }

        if (req.body.attachments) {
          await Promise.all(
            req.body.attachments.map(async (attachment) => {
              const newAttachment = await Attachment.create({
                url: attachment.url,
              });
              if (newAttachment) {
                await BillAttachment.create({
                  AttachmentId: newAttachment.id,
                  BillId: quotation.id,
                });
              }
            })
          );
        }

        if (req.body.contactDetail) {
          const contactDetail = await ContactDetail.create({
            email: req.body.contactDetail.email,
            phoneNumber: req.body.contactDetail.phoneNumber,
          });
          if (contactDetail) {
            await BillContactDetail.create({
              ContactDetailId: contactDetail.id,
              BillId: quotation.id,
            });
          }
        }

        if (req.body.transportDetail) {
          const transportDetail = await TransportDetail.create({
            challanNumber: req.body.transportDetail.challanNumber,
            challanDate: req.body.transportDetail.challanDate,
            name: req.body.transportDetail.name,
            notes: req.body.transportDetail.notes,
          });
          if (transportDetail) {
            await BillTransportDetail.create({
              TransportDetailId: transportDetail.id,
              BillId: quotation.id,
            });
          }
        }
        const quotationUpdated = await Bill.findOne({
          where: { id: quotation.id },
          include: [
            { model: Item, as: "items", through: { attributes: [] } },
            {
              model: Attachment,
              as: "attachments",
              through: { attributes: [] },
            },
            {
              model: ContactDetail,
              as: "contactDetail",
              through: { attributes: [] },
            },
            {
              model: TransportDetail,
              as: "transportDetail",
              through: { attributes: [] },
            },
            { model: Address, as: "shippedTo", through: { attributes: [] } },
            { model: Address, as: "shippedFrom", through: { attributes: [] } },
          ],
        });
        return res.status(200).json({
          success: true,
          data: quotationUpdated,
          msg: "Quotation created successfully",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  }

  public async all(req: Request, res: Response) {
    try {
      const quotations = await Bill.findAll({
        where: {
          StoreId: req.user.activeStoreId,
          billType: BillType.Quotation,
        },
        include: [
          { model: Item, as: "items", through: { attributes: [] } },
          { model: Attachment, as: "attachments", through: { attributes: [] } },
          {
            model: ContactDetail,
            as: "contactDetail",
            through: { attributes: [] },
          },
          {
            model: TransportDetail,
            as: "transportDetail",
            through: { attributes: [] },
          },
          { model: Address, as: "shippedTo", through: { attributes: [] } },
          { model: Address, as: "shippedFrom", through: { attributes: [] } },
        ],
      });

      res.status(200).json({
        success: quotations.length > 0 ? true : false,
        msg: "Quotations",
        data: quotations,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const quotation = await Bill.findOne({
        where: { id: req.body.billId },
      });

      if (quotation) {
        await quotation.update({
          quotationNo: req.body.quotationNo,
          quotationDate: req.body.quotationDate,
          subTitle: req.body.subTitle,
          status: req.body.status,
          StoreId: req.user.activeStoreId,
          ClientId: req.body.clientId,
          amount: req.body.amount,
          tax: req.body.tax,
          discount: req.body.discount,
          termsAndConditions: req.body.termsAndConditions,
          notes: req.body.notes,
          signature: req.body.signature,
          emailSent: req.body.emailSent,
        });

        return res.status(200).json({
          success: true,
          message: "Updated quotation successfully",
          data: quotation,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Internal server error ",
          data: null,
        });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  }
}
