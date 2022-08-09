import { Router } from "express";
import adRouter from "./advertisement.routes";

const routes = Router();

routes.use("/ads", adRouter);

export default routes;
