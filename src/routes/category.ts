import { Router } from "express"
import { CategoryController } from "../controllers/category"

import authMiddleware from "../lib/middlewares/auth"

export class CategoryRoutes {
  public router: Router
  public categoryController: CategoryController = new CategoryController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  public routes() {
    this.router.post("/create", authMiddleware, this.categoryController.validate('create'), this.categoryController.create);
  }
}