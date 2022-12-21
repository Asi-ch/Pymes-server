import { Router } from "express"
import { AddressController } from "../controllers/address"
import authMiddleware from "../lib/middlewares/auth"
import checkActiveStoreMiddleware from "../lib/middlewares/checkActiveStore"

export class AddressRoutes {
  public router: Router
  public addressController: AddressController = new AddressController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  public routes() {
    this.router.post("/create", authMiddleware, checkActiveStoreMiddleware, this.addressController.create);
    this.router.get("/all", authMiddleware, checkActiveStoreMiddleware, this.addressController.all);
    this.router.post("/update", authMiddleware, checkActiveStoreMiddleware, this.addressController.validate('update'), this.addressController.update);

  }
}