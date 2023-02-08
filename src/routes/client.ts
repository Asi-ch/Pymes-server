import { Router } from "express";
import { ClientController } from "../controllers/client";
import authMiddleware from "../lib/middlewares/auth";
import checkActiveStoreMiddleware from "../lib/middlewares/checkActiveStore";

export class ClientRoutes {
  public router: Router;
  public clientController: ClientController = new ClientController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.post(
      "/create",
      authMiddleware,
      checkActiveStoreMiddleware,
      this.clientController.validate("create"),
      this.clientController.create
    );
    this.router.post(
      "/update",
      authMiddleware,
      this.clientController.validate("update"),
      this.clientController.update
    );
    this.router.get(
      "/all",
      authMiddleware,
      checkActiveStoreMiddleware,
      this.clientController.all
    );
    this.router.post(
      "/delete",
      authMiddleware,
      this.clientController.validate("delete"),
      this.clientController.delete
    );
  }
}
