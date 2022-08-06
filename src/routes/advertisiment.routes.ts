import { Router } from "express";
import AdvertisimentController from "../controllers/AdvertisementController";

const adRouter = Router();

adRouter.post("/", AdvertisimentController.store);
adRouter.get("/", AdvertisimentController.index);
adRouter.get("/:ad_id", AdvertisimentController.show);

export default adRouter;
