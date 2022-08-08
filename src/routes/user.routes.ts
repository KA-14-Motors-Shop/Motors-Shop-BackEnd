import {Router} from "express"


const routes = Router()


import UserController from "../controllers/user/UserController"

routes.post("/users",UserController.store )


export default routes