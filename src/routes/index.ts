import { Router } from "express";
import adRouter from "./advertisement.routes";
import userRouter from "./user.routes";

const routes = Router();

routes.use("/ads", adRouter);
routes.use("/", userRouter);

export default routes;
