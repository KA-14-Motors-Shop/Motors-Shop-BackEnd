import { Router } from "express";
import adRouter from "./advertsiment.routes";

const routes = Router();

routes.use("/ads", adRouter);

export default routes;
