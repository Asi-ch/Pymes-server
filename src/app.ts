import cors from "cors";
import * as express from "express";
import fs from "fs";
import ModelsInit from "./models"
import { UserRoutes } from "./routes/user";
// tslint:disable-next-line: no-var-requires
require("dotenv").config();
// adding custom Request global typing.


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
  }
}

export default new App().app;
