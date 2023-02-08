import { Router } from "express";
import { ProductsController } from "../controllers/product";
import authMiddleware from "../lib/middlewares/auth";
import checkActiveStoreMiddleware from "../lib/middlewares/checkActiveStore";

export class ProductRoutes {
  public router: Router;
  public productController: ProductsController = new ProductsController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.get(
      "/",
      authMiddleware,
      checkActiveStoreMiddleware,
      this.productController.getAll
    );
    this.router.post(
      "/create",
      authMiddleware,
      checkActiveStoreMiddleware,
      this.productController.validate("create"),
      this.productController.createProduct
    );
    this.router.post(
      "/update",
      authMiddleware,
      checkActiveStoreMiddleware,
      this.productController.validate("update"),
      this.productController.updateProduct
    );
    this.router.get(
      "/get-all-variants/:productId",
      authMiddleware,
      checkActiveStoreMiddleware,
      this.productController.getAllProductVariants
    );
    this.router.post(
      "/update-product-variant",
      authMiddleware,
      checkActiveStoreMiddleware,
      this.productController.validate("updateProductVariation"),
      this.productController.updateProductVariation
    );
    this.router.post(
      "/add-product-variant",
      authMiddleware,
      checkActiveStoreMiddleware,
      this.productController.validate("addProductVariant"),
      this.productController.addProductVariant
    );
    this.router.post(
      "/delete-product-variant",
      authMiddleware,
      checkActiveStoreMiddleware,
      this.productController.validate("deleteProductVariant"),
      this.productController.deleteProductVariant
    );
    this.router.post(
      "/get",
      authMiddleware,
      this.productController.getProductById
    );
  }
}
