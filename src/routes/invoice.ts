import { Router } from "express"
import { InvoiceController } from "../controllers/invoice"
import authMiddleware from "../lib/middlewares/auth"
import checkActiveStoreMiddleware from "../lib/middlewares/checkActiveStore"

export class InvoiceRoutes {
  public router: Router
  public invoiceController: InvoiceController = new InvoiceController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  public routes() {
    this.router.post("/create", authMiddleware, checkActiveStoreMiddleware, this.invoiceController.validate('create'), this.invoiceController.create);
    this.router.get("/all", authMiddleware, checkActiveStoreMiddleware, this.invoiceController.all);
    this.router.post("/update", authMiddleware, checkActiveStoreMiddleware, this.invoiceController.validate('update'), this.invoiceController.update);

  }
}