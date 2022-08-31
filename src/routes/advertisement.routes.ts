import { Router } from "express";
import AdvertisimentController from "../controllers/AdvertisementController";
import { expressYupMiddleware } from "express-yup-middleware";
import createAdvertisementSchema from "../validations/advertisement/createAdvertisement.validation";
import { userAuthentication } from "../middlewares/user/authUser.middleware";
import { checkIsOwner } from "../middlewares/checkIsOwner.middleware";
import multer from "multer";
import { uploadImage, uploadNewImages } from "../services/firebase/firebase";
import adImageRelationMiddleware from "../middlewares/advertisement/adImageRelation.middleware";

const adRouter = Router();

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2048 * 2048 },
});

adRouter.post(
  "/",
  Multer.fields([{ name: "image" }, { name: "front", maxCount: 1 }]),
  // expressYupMiddleware({ schemaValidator: createAdvertisementSchema }),
  userAuthentication,
  uploadImage,
  AdvertisimentController.store
);
adRouter.get("/", AdvertisimentController.index);
adRouter.get("/:ad_id", AdvertisimentController.show);
adRouter.patch("/status/:ad_id", AdvertisimentController.toggleActive);
adRouter.patch(
  "/:ad_id",
  Multer.fields([{ name: "image" }, { name: "front", maxCount: 1 }]),
  userAuthentication,
  checkIsOwner,
  uploadNewImages,
  AdvertisimentController.update
);
adRouter.delete(
  "/:ad_id/image/:img_id",
  userAuthentication,
  checkIsOwner,
  adImageRelationMiddleware,
  AdvertisimentController.deleteImage
);

export default adRouter;
