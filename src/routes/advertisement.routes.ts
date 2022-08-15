import { Router } from "express";
import AdvertisimentController from "../controllers/AdvertisementController";
import { expressYupMiddleware } from "express-yup-middleware";
import createAdvertisementSchema from "../validations/advertisement/createAdvertisement.validation";
import { userAuthentication } from "../middlewares/user/authUser.middleware";
import { checkIsOwner } from "../middlewares/checkIsOwner.middleware";

const adRouter = Router();

adRouter.post(
  "/",
  expressYupMiddleware({ schemaValidator: createAdvertisementSchema }),
  userAuthentication,
  AdvertisimentController.store
);
adRouter.get("/", AdvertisimentController.index);
adRouter.get("/:ad_id", AdvertisimentController.show);
adRouter.patch("/status/:ad_id", AdvertisimentController.toggleActive);
adRouter.patch(
  "/:ad_id",
  userAuthentication,
  checkIsOwner,
  AdvertisimentController.update
);

export default adRouter;
