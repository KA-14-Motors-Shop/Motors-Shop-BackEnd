import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entity"






const userListOneService = async(userId:string) => {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where:{
            id:userId
        }
    })


    return user

}

export default userListOneService