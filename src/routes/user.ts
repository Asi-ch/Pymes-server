import { Router } from "express"
import { UserController } from "../controllers/user"

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
  }
}