import { Router } from "express";
import adRouter from "./advertisiment.routes";

const routes = Router();

routes.use("/ads", adRouter);

export default routes;
