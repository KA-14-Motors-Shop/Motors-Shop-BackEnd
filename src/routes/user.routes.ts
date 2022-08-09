import {Router} from "express"


const routes = Router()


import UserController from "../controllers/user/UserController"

routes.post("/users",UserController.store )
routes.get("/users",UserController.index )
routes.post("/login",UserController.loginUser )


export default routes