import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Store, User, UserStore, UserType } from "../../models";

export class StoreController {
  public validate(method: string) {
    switch (method) {
      case "createStore": {
        return [
          check("name").not().isEmpty().withMessage("Store name is required"),
          check("location")
            .not()
            .isEmpty()
            .withMessage("Store location is required"),
        ];
      }
      case "setActiveStore": {
        return [
          check("storeId").not().isEmpty().withMessage("Store Id is required"),
        ];
      }
    }
  }
  public async createStore(req: Request, res: Response) {
    try {
      console.log("User id  =>", req.user, req.userId);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      let store = await Store.create({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        vatNumber: req.body.vatNumber,
      });
      if (store) {
        let userType = await UserType.findOne({
          where: {
            name: "Admin",
          },
        });
        let userTypeSM = await UserType.findOne({
          where: {
            name: "SalesManager",
          },
        });
        let userTypeIM = await UserType.findOne({
          where: {
            name: "InventoryManager",
          },
        });

        await UserStore.create({
          UserId: req.userId,
          StoreId: store.id,
          UserTypeId: userType.id,
        });
        await UserStore.create({
          UserId: req.userId,
          StoreId: store.id,
          UserTypeId: userTypeSM.id,
        });
        await UserStore.create({
          UserId: req.userId,
          StoreId: store.id,
          UserTypeId: userTypeIM.id,
        });

        store = await Store.findOne({
          where: {
            id: store.id,
          },
          include: [
            {
              model: UserType,
              as: "user_types",
              // through: { attributes: [''] }
            },
          ],
        });

        if (!req.body.skipOnboarding) {
          const user = await User.findOne({
            where: {
              id: req.userId,
            },
          });
          user.update({
            activeStoreId: store.id,
            onboardingStep: 1,
          });
        }

        res.status(200).json({
          success: true,
          data: store,
        });
      } else {
        res.status(422).json({
          success: false,
          errors: [{ param: "err", msg: "Unable to create Store" }],
        });
      }
    } catch (error) {
      console.log("Error => ", error);
      res.status(500).json({
        success: false,
        error,
      });
    }
  }
  public async updateStore(req: Request, res: Response) {
    try {
      console.log("User id  =>", req.user, req.activeStoreId);
    } catch (error) {
      console.log("Error => ", error);
      res.status(500).json({
        success: false,
        error,
      });
    }
  }

  public async setActiveStore(req: Request, res: Response) {
    try {
      console.log("User id  =>", req.user, req.userId);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }
      const user = await User.findOne({ where: { id: req.user.id } });
      if (user) {
        await user.update({
          activeStoreId: req.body.storeId,
        });
        return res
          .status(200)
          .json({ success: true, msg: "Active Store fot user updated" });
      } else {
        return res.status(422).json({ success: false, msg: "User not found " });
      }
    } catch (error) {
      console.log("Error => ", error);
      res.status(500).json({
        success: false,
        error,
      });
    }
  }
  public async getAllAdminStores(req: Request, res: Response) {
    try {
      const user = req.user;
      const stores = await user.getAllAdminStores();

      console.log("User id  =>", stores);
      res.json({
        success: true,
        data: stores,
      });
    } catch (error) {
      console.log("Error => ", error);
      res.status(500).json({
        success: false,
        error,
      });
    }
  }
}
