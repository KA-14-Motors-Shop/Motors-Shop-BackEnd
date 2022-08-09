import { Router } from "express";
import AdvertisimentController from "../controllers/AdvertisementController";
import { expressYupMiddleware } from "express-yup-middleware";
import createAdvertisementSchema from "../validations/advertisement/createAdvertisement.validation";

const adRouter = Router();

adRouter.post(
  "/",
  expressYupMiddleware({ schemaValidator: createAdvertisementSchema }),
  AdvertisimentController.store
);
adRouter.get("/", AdvertisimentController.index);
adRouter.get("/:ad_id", AdvertisimentController.show);
adRouter.patch("/switch/:ad_id", AdvertisimentController.toggleActive);

export default adRouter;
