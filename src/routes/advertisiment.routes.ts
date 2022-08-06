import { Router } from "express";
import AdvertisimentController from "../controllers/AdvertisementController";

const adRouter = Router();

adRouter.post("/", AdvertisimentController.store);

export default adRouter;
