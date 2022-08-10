import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";



export default class UserDeleteService {

    static async userDeleteService(email:string){

        const userRepository = AppDataSource.getRepository(User)
    
        const userToDelete = await userRepository.findOne({
            where:{
                email
            }
        })
    
        await userRepository.delete(userToDelete!.id)
    
        return true
    
    }

}