import { check, validationResult } from "express-validator";
import { Request, Response } from "express";
import { Category } from "../../models";
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
        name: req.body.name
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

}