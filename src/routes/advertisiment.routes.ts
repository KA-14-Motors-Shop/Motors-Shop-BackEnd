import { Router } from "express";
import AdvertisimentController from "../controllers/AdvertisementController";

const adRouter = Router();

adRouter.post("/", AdvertisimentController.store);
adRouter.get("/", AdvertisimentController.index);

export default adRouter;
