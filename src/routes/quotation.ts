import { Router } from "express"
import { QuotationController } from "../controllers/quotation"
import authMiddleware from "../lib/middlewares/auth"
import checkActiveStoreMiddleware from "../lib/middlewares/checkActiveStore"

export class QuotationRoutes {
  public router: Router
  public quotationController: QuotationController = new QuotationController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  public routes() {
    this.router.post("/create", authMiddleware, checkActiveStoreMiddleware, this.quotationController.validate('create'), this.quotationController.create);
    this.router.get("/all", authMiddleware, checkActiveStoreMiddleware, this.quotationController.all);
    this.router.post("/update", authMiddleware, checkActiveStoreMiddleware, this.quotationController.validate('update'), this.quotationController.update);

  }
}