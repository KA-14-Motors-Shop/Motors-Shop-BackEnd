import { Router } from "express";
import adRouter from "./advertisement.routes";
import userRouter from "./user.routes";
import commentRouter from "./comment.routes";

const routes = Router();

routes.use("/ads", adRouter);
routes.use("/", userRouter);
routes.use("/comments", commentRouter);

export default routes;
