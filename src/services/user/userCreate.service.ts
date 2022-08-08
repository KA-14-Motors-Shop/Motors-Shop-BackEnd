import { UserCreationParams } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import bcrypt, { hash } from "bcrypt";


const userCreateService = async({name, cpf, email, password, description, cell_phone,birthday,address} : UserCreationParams) => {

    const userRepository = AppDataSource.getRepository(User)

    const emailAlreadyExists = await userRepository.findOne({
        where:{
            email,
        }
    })


    if(emailAlreadyExists){
        throw new AppError("This email already exists!", 401)
    }

    const passwordHashed = await hash(password, 10)

    const user = userRepository.create({
        name,
        cpf,
        email,
        password: passwordHashed,
        description,
        cell_phone,
        birthday,
        is_active: true,
        address,

    })

    await userRepository.save(user)

    return user

}

export default userCreateService