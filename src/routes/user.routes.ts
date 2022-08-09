import {Router} from "express"
import { userAuthentication } from "../middlewares/user/authUser.middleware"

const routes = Router()


import UserController from "../controllers/user/UserController"


// criar
routes.post("/users",UserController.store )
//login
routes.post("/login",UserController.loginUser )
//listar todos
routes.get("/users",UserController.index )
//lista um
routes.get("/users/me", userAuthentication,UserController.indexOne)
//update user
routes.patch("/users", userAuthentication,UserController.update)
//delete
routes.delete("/users",userAuthentication,UserController.delete)

export default routes