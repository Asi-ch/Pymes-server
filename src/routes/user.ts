import { Router } from "express"
import { UserController } from "../controllers/user"
import authMiddleware from "../lib/middlewares/auth"

export class UserRoutes {

  public router: Router
  public userController: UserController = new UserController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.post("/sign-up", this.userController.validate('createUser'), this.userController.createUser);
    this.router.post("/sign-in", this.userController.validate('login'), this.userController.signIn);
    this.router.get("/list-plans", authMiddleware, this.userController.listPlans)
    this.router.post("/subscribe", authMiddleware, this.userController.validate('subscribe'), this.userController.subscribe)
    this.router.post("/create-stripe-customer", authMiddleware, this.userController.validate('createStripeCustomer'), this.userController.createStripeCustomer)
    this.router.get("/get-incoming-invoices", authMiddleware, this.userController.getIncomingInvoices)
    this.router.get("/get-invoices-history", authMiddleware, this.userController.getInvoicesHistory)
    this.router.get("/get-subscriptions", authMiddleware, this.userController.subscriptions)
    this.router.post("/un-subscribe", authMiddleware, this.userController.validate('unSubscribe'), this.userController.unsubscribe)

  }
}