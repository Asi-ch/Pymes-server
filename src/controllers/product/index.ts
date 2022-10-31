import { RDS } from "aws-sdk";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Product, ProductVariation, } from "../../models";

export class ProductsController {

  public validate(method: string) {
    switch (method) {
      case "create": {
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n Create product ")

        return [
          check("name")
            .not()
            .isEmpty()
            .withMessage("Product name is required"),
          check("description")
            .not()
            .isEmpty()
            .withMessage("Description is required"),
          check("productVariation.*.quantity")
            .not()
            .isEmpty(),

          check("productVariation.*.cost")
            .not()
            .isEmpty()

        ];
      }
      case "updateProductVariation": {
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n Validating product variation")
        return [
          check("productVariationId")
            .not()
            .isEmpty()
            .withMessage("Product Variation ID is required"),

        ];
      }
      case "update": {
        return [
          check("productId")
            .not()
            .isEmpty()
            .withMessage("Product Id is required"),
        ];
      }
      case "addProductVariant": {
        return [
          check("productId")
            .not()
            .isEmpty()
            .withMessage("Product Id is required"),
          check("cost").not().isEmpty().withMessage("Cost is required"),
          check("quantity").not().isEmpty().withMessage("Quantity is required")
        ];
      }
      case "deleteProductVariant": {
        return [
          check("productVariationId")
            .not()
            .isEmpty()
            .withMessage("Product variation Id is required"),
        ];
      }

    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const products = await Product.findAll({ where: { StoreId: req.user.activeStoreId }, include: [ProductVariation] })
      return res.status(200).json({ success: true, products })
    } catch (error) {
      return res.status(500).json({ success: false, error })
    }
  }
  public async createProduct(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }
      console.log("Product create ", req.body)
      const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        StoreId: req.user.activeStoreId,
        CategoryId: req.body.categoryId,
      })

      if (req.body.productVariation && product) {
        const variations = req.body.productVariation;
        if (variations.length > 0) {
          await Promise.all(variations.map(async (singleVariation: any) => {
            if (singleVariation.cost && singleVariation.quantity) {

              await ProductVariation.create({
                ProductId: product.id,
                cost: singleVariation.cost,
                quantity: singleVariation.quantity,
                size: singleVariation.size,
                color: singleVariation.color,
              })
            }
          }))
        }
        const prod = await Product.findOne({
          where: { id: product.id, },
          include: [ProductVariation]
        })

        return res.status(200).json({ success: true, message: "Product was created successfully", data: prod })



      } else {
        if (product) {
          const prod = await Product.findOne({
            where: { id: product.id, },
            include: [ProductVariation]
          })

          return res.status(200).json({ success: true, message: "Product was created successfully. But no product variations were found", data: prod })

        } else {

          return res.status(200).json({ success: true, message: "Product was not created successfully" })

        }
      }


    } catch (error) {

      console.log("Error ===> ", error)
      return res.status(500).json({ success: false, error })

    }
  }
  public async updateProduct(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }
      const product = await Product.findOne({
        where: { id: req.body.productId, },
        include: [ProductVariation]
      })

      if (product) {
        await product.update({
          name: req.body.name,
          description: req.body.description,
          CategoryId: req.body.categoryId,
        })
        return res.status(200).json({ success: true, data: product })
      } else {
        return res.status(404).json({ success: false, message: "Product not found " })
      }



    } catch (error) {

      console.log("Error ===> ", error)
      return res.status(500).json({ success: false, error })

    }
  }

  public async updateProductVariation(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }
      const productVariation = await ProductVariation.findOne({
        where: { id: req.body.productVariationId }
      })

      if (productVariation) {
        await productVariation.update({
          cost: req.body.cost,
          quantity: req.body.quantity,
          size: req.body.size,
          color: req.body.color
        }
        )
        return res.status(200).json({ success: true, productVariation })

      } else {
        return res.status(404).json({ success: false, message: "Product variation not found " })
      }



    } catch (error) {
      console.log("Error ==> ", error)
      res.status(500).json({ success: false, error })
    }
  }

  public async getAllProductVariants(req: Request, res: Response) {
    try {
      const allVariants = await ProductVariation.findAll({ where: { ProductId: req.params.productId } })
      if (allVariants.length > 0) {
        return res.status(200).json({ success: true, data: allVariants })
      } else {
        return res.status(404).json({ success: false, message: "Product Variants not found" })
      }
    } catch (error) {
      return res.status(500).json({ success: false, error })
    }
  }

  public async addProductVariant(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }
      const product = await Product.findOne({ where: { id: req.body.productId } })
      if (!product) { return res.status(404).json({ success: false, message: "Product not found " }) }
      const productVariant = await ProductVariation.create({
        ProductId: product.id,
        cost: req.body.cost,
        quantity: req.body.quantity,
        size: req.body.size,
        color: req.body.color,
      })

      if (productVariant) {
        const prod = await Product.findOne({
          where: { id: product.id, },
          include: [ProductVariation]
        })
        return res.status(200).json({ success: true, message: "Product variation added ", data: prod })
      } else {
        return res.status(400).json({ success: false, message: "Variation not added" })
      }
    } catch (error) {
      return res.status(500).json({ success: false, error })
    }
  }

  public async deleteProductVariant(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }
      const deleted = await ProductVariation.destroy({ where: { id: req.body.productVariationId } })
      if (deleted === 1) {
        return res.status(200).json({ success: true, message: "Row deleted successfully" });
      } else {
        return res.status(404).json({ success: false, message: "Not deleted" })
      }
    } catch (error) {
      return res.status(500).json({ success: false, error })
    }
  }
}