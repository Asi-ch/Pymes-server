import cors from "cors";
import * as express from "express";
import fs from "fs";
import ModelsInit, { User } from "./models"
import { StoreRoutes } from "./routes/store";
import { UserRoutes } from "./routes/user";
// tslint:disable-next-line: no-var-requires
require("dotenv").config();
// adding custom Request global typing.

declare global {
  namespace Express {
    interface Request {
      userId: number;
      storeId: number;
      activeStoreId: number;
      user: User;
    }
  }
}

class App {
  public app: express.Application;

  constructor() {
    this.app = express.default();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json({
      limit: "50mb"
    }))
    this.app.use(
      express.urlencoded({
        extended: true,
        limit: "50mb",
        parameterLimit: 100000,
      })
    );
    this.app.use(cors());
    ModelsInit()
  }

  public routes(): void {
    this.app.use("/api/users", new UserRoutes().router)
    this.app.use("/api/stores", new StoreRoutes().router)
  }
}

export default new App().app;
