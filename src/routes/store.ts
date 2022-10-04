import { Router } from "express"
import { StoreController } from "../controllers/store/index"
import authMiddleware from "../lib/middlewares/auth"

export class StoreRoutes {
  public router: Router
  public storeController: StoreController = new StoreController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  public routes() {
    this.router.post("/create", authMiddleware, this.storeController.validate('createStore'), this.storeController.createStore);
  }
}