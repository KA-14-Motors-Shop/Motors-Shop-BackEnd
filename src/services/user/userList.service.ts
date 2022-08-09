import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { instanceToPlain } from "class-transformer";

export default class UserListService {

    static async listOneService(email:string) {
        const userRepository = AppDataSource.getRepository(User)
    
        const user = await userRepository.findOne({
            where:{
                email
            }
        })
    
    
        return instanceToPlain(user)
    
    }

}