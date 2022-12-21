import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Address, Attachment, Client, ContactDetail, Item, Invoice, InvoiceAttachment, InvoiceContactDetail, InvoiceItem, InvoiceShippedFrom, InvoiceShippedTo, InvoiceTransportDetail, Store, TransportDetail } from "../../models";

export class InvoiceController {
  public validate(method: string) {
    switch (method) {
      case 'create': {
        return [
          check("invoiceNo")
            .custom(async (value) => {
              const invoice = await Invoice.findOne({
                where: {
                  invoiceNo: value,
                },
              });
              if (invoice) {
                return Promise.reject("invoice number is already in use");
              }
            })
            .not()
            .isEmpty()
            .withMessage("Invoice Number is required"),
          check("invoiceDate")
            .not()
            .isEmpty()
            .withMessage("Invoice Date is required"),
          check("clientId")
            .not()
            .isEmpty()
            .withMessage("Client id is required"),
          check("items.*.name")
            .not()
            .isEmpty()
            .withMessage("Items.Name is required")
          ,
          check("items.*.quantity")
            .not()
            .isEmpty()
            .withMessage("Items.Quantity is required")
        ]
      }
      case 'update': {
        return [
          check("invoiceId")
            .custom(async (value) => {
              const invoice = await Invoice.findOne({
                where: {
                  id: value,
                },
              });
              if (!invoice) {
                return Promise.reject("Invoice id is invalid");
              }
            })
            .not()
            .isEmpty()
            .withMessage("Invoice Id is required"),
        ]
      }
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const invoice = await Invoice.create({
        invoiceNo: req.body.invoiceNo,
        invoiceDate: req.body.invoiceDate,
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
      })




      if (invoice) {

        if (req.body.items) {
          await Promise.all(req.body.items.map(async (item) => {
            const newItem = await Item.create({
              name: item.name,
              taxRate: item.taxRate,
              quantity: item.quantity,
              rate: item.rate,
              total: item.total,
              totalTax: item.totalTax,
              description: item.description,
            })
            if (newItem) {
              await InvoiceItem.create({
                ItemId: newItem.id,
                InvoiceId: invoice.id
              })
            }
          }))
        }

        if (req.body.shippedTo) {
          const shippedTo = await Address.create({
            country: req.body.shippedTo.country,
            city: req.body.shippedTo.city,
            state: req.body.shippedTo.state,
            street: req.body.shippedTo.street,
            zipCode: req.body.shippedTo.zipCode,
            streetAddress: req.body.shippedTo.streetAddress
          })
          if (shippedTo) {
            await InvoiceShippedTo.create({
              AddressId: shippedTo.id,
              InvoiceId: invoice.id
            })
          }
        }
        if (req.body.shippedFrom) {
          const shippedFrom = await Address.create({
            country: req.body.shippedFrom.country,
            city: req.body.shippedFrom.city,
            state: req.body.shippedFrom.state,
            street: req.body.shippedFrom.street,
            zipCode: req.body.shippedFrom.zipCode,
            streetAddress: req.body.shippedFrom.streetAddress
          })
          if (shippedFrom) {
            await InvoiceShippedFrom.create({
              AddressId: shippedFrom.id,
              InvoiceId: invoice.id
            })
          }
        }

        if (req.body.attachments) {
          await Promise.all(req.body.attachments.map(async (attachment) => {
            const newAttachment = await Attachment.create({
              url: attachment.url,
            })
            if (newAttachment) {
              await InvoiceAttachment.create({
                AttachmentId: newAttachment.id,
                InvoiceId: invoice.id
              })
            }
          }))
        }

        if (req.body.contactDetail) {
          const contactDetail = await ContactDetail.create({
            email: req.body.contactDetail.email,
            phoneNumber: req.body.contactDetail.phoneNumber
          })
          if (contactDetail) {
            await InvoiceContactDetail.create({
              ContactDetailId: contactDetail.id,
              InvoiceId: invoice.id
            })
          }
        }

        if (req.body.transportDetail) {
          const transportDetail = await TransportDetail.create({
            challanNumber: req.body.transportDetail.challanNumber,
            challanDate: req.body.transportDetail.challanDate,
            name: req.body.transportDetail.name,
            notes: req.body.transportDetail.notes
          })
          if (transportDetail) {
            await InvoiceTransportDetail.create({
              TransportDetailId: transportDetail.id,
              InvoiceId: invoice.id
            })
          }
        }
        const invoiceUpdated = await Invoice.findOne({
          where: { id: invoice.id },
          include: [
            { model: Item, as: "items", through: { attributes: [] } },
            { model: Attachment, as: "attachments", through: { attributes: [] } },
            { model: ContactDetail, as: "contactDetail", through: { attributes: [] } },
            { model: TransportDetail, as: "transportDetail", through: { attributes: [] } },
            { model: Address, as: "shippedTo", through: { attributes: [] } },
            { model: Address, as: "shippedFrom", through: { attributes: [] } },
          ]
        })
        return res.status(200).json({ success: true, data: invoiceUpdated, msg: "Invoice created successfully" })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, error })
    }
  }

  public async all(req: Request, res: Response) {
    try {
      const invoices = await Invoice.findAll(
        {
          where: { StoreId: req.user.activeStoreId },
          include: [
            { model: Item, as: "items", through: { attributes: [] } },
            { model: Attachment, as: "attachments", through: { attributes: [] } },
            { model: ContactDetail, as: "contactDetail", through: { attributes: [] } },
            { model: TransportDetail, as: "transportDetail", through: { attributes: [] } },
            { model: Address, as: "shippedTo", through: { attributes: [] } },
            { model: Address, as: "shippedFrom", through: { attributes: [] } },
          ]
        }
      )

      res.status(200).json({ success: invoices.length > 0 ? true : false, msg: "Invoices", data: invoices })
    } catch (error) {
      return res.status(500).json({ success: false, error })
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const invoice = await Invoice.findOne({ where: { id: req.body.invoiceId } })

      if (invoice) {
        await invoice.update({
          invoiceNo: req.body.invoiceNo,
          invoiceDate: req.body.invoiceDate,
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
        })

        return res.status(200).json({ success: true, message: "Updated Invoice successfully", data: Invoice })
      } else {
        return res.status(404).json({ success: false, message: "Internal server error ", data: null })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, error })
    }
  }
}