import {Request, Response} from "express"
import { array } from "yup"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entity"
import userCreateService from "../../services/user/userCreate.service"
import userListOneService from "../../services/user/userListOne.service"

export default class UserController {


    static async store (req:Request, res:Response){
        try{
            const {name, cpf, email, password, description, cell_phone,birthday, address} = req.body

            const newUser = await userCreateService({name,cpf,email,password,description,cell_phone,birthday,address})

            return res.status(201).send(newUser)

        }
        catch(err){
            
            if (err instanceof Error){
                return res.status(400).send({
                    "error": err.name,
                    "message": err.message
                })
            }
        }


    }

    static async index(req:Request, res:Response){
        const userRepository = AppDataSource.getRepository(User)
        
        const allUsers = await userRepository.find()

        let newList: any = []

        allUsers.forEach((elem:any) => {
            const {password, ...noPassword} : {password: string, noPassword: any} = elem

            newList.push(noPassword)
        })

        return newList
    }


    static async indexOne(req:Request, res:Response){

        try{
            const {userId} = req.params
    
            const uniqueUser = await userListOneService(userId)

            return res.status(200).send(uniqueUser)

        } catch(err){
            
            if (err instanceof Error) {
                return res.status(404).send({
                    "error": err.name,
                    "message": err.message
                })
            }

        }
    }

    static async update (req:Request, res:Response){
        try {
            // PRECISO DO MIDDLEWARE PARA CONTINUAR
        }


    }
}