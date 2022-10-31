import { check, validationResult } from "express-validator";
import { Request, Response } from "express";
import { Category, Product } from "../../models";
export class CategoryController {
  public validate(method: string) {
    switch (method) {
      case "create": {
        return [
          check("name")
            .not()
            .isEmpty()
            .withMessage("Category name is required"),
        ];
      }

    }
  }
  public async create(req: Request, res: Response) {
    try {
      console.log("User id  =>", req.user, req.userId)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const category = await Category.create({
        name: req.body.name,
        StoreId: req.user.activeStoreId
      })

      if (category) {
        return res.status(200).json({ success: true, data: category });
      } else {
        return res.status(400).json({ success: false, message: "Category not created" })
      }

    } catch (error) {

      console.log("Error => ", error)
      res.status(500).json({
        success: false,
        error,
      });
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const category = await Category.findAll({ where: { StoreId: req.user.activeStoreId }, include: [Product] })
      return res.status(200).json({ success: true, category: category })
    } catch (error) {

    }
  }

  public async getAllProductByCategory(req: Request, res: Response) {
    try {
      if (!req.body.categoryId) return res.status(404).json({ success: false, msg: "Category Id is Required" })
      const category = await Category.findAll({ where: { id: req.body.categoryId }, include: [Product] })
      console.log("\n\n\n\n\n\n\n\n\n Category ===> ", category)

      if (category) {
        return res.status(200).json({ success: true, data: category })
      }
    } catch (error) {

    }
  }

}