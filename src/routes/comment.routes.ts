import { Router } from "express";
import { userAuthentication } from "../middlewares/user/authUser.middleware";

const commentRouter = Router();

import CommentController from "../controllers/Comment.controller";

// criar
commentRouter.post("/:ad_id", userAuthentication, CommentController.store);

export default commentRouter;
