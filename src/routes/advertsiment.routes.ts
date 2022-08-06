import { Router } from "express";
import AdvertsimentController from "../controllers/AdvertisementController";

const adRouter = Router();

adRouter.post("/", AdvertsimentController.store);

export default adRouter;
