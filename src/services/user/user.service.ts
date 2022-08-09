import { UserCreationParams, UserLoginParams } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { Address } from "../../entities/addresses.entity";
// import AppError from "../../errors/AppError";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken"


export default class UserMainService {


static async creationService({name, cpf, email, password, description, cell_phone,birthday,address} : UserCreationParams)  {

    const userRepository = AppDataSource.getRepository(User)
    const addresRepository = AppDataSource.getRepository(Address)

    const emailAlreadyExists = await userRepository.findOne({
        where:{
            email,
        }
    })

    if(emailAlreadyExists){
        throw new Error("This email already exists!")
    }

    const userAddress = addresRepository.create({...address})

    await addresRepository.save(userAddress)


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
        address: userAddress,
        advertisements:[]

    })

    await userRepository.save(user)

    return user

}

static async listOneService(userId:string) {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where:{
            id:userId
        }
    })


    return user

}



static async userLoginService({email, password}:UserLoginParams) {

    const userRepository = AppDataSource.getRepository(User)

    const userAccount = await userRepository.findOne({
        where:{
            email,
        }
    })

    if (!userAccount){
        throw new Error("Account not found!")
    }

    if (!bcrypt.compareSync(password, userAccount.password)){
        throw new Error("Wrong Email/Password. I can't say...")
    }

    const token = jwt.sign(
        {email:email},
        String(process.env.SECRET_KEY),
        {expiresIn:'24h'}
    )


    return token
}


}
// export default userCreateService