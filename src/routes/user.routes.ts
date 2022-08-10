import { Router } from "express";
import { userAuthentication } from "../middlewares/user/authUser.middleware";

import { expressYupMiddleware } from "express-yup-middleware";
import {
  createUserSchema,
  addressSchemaValidator,
} from "../validations/user/createUser.validation";

const userRouter = Router();

import UserController from "../controllers/user/UserController";

// criar
userRouter.post(
  "/users",
  expressYupMiddleware({ schemaValidator: createUserSchema }),
  addressSchemaValidator,
  UserController.store
);
//login
userRouter.post("/login", UserController.loginUser);
//listar todos
userRouter.get("/users", UserController.index);
//lista o perfil do usuário
userRouter.get("/users/me", userAuthentication, UserController.indexMyProfile);
//lista um user pelo id.
userRouter.get("/users/:id",userAuthentication, UserController.indexOneProfilePerId)
//update user
userRouter.patch("/users", userAuthentication, UserController.update);
//delete
userRouter.delete("/users", userAuthentication, UserController.delete);

export default userRouter;
