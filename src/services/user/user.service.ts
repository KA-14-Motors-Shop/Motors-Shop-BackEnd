import { UserCreationParams, UserLoginParams } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { Address } from "../../entities/addresses.entity";
// import AppError from "../../errors/AppError";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken"
import { Advertisement } from "../../entities/advertisements.entity";


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

static async listOneService(email:string) {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where:{
            email
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



static async userUpdateService({name, cpf, email, password, description, cell_phone, birthday, address} : UserCreationParams){
    const userRepository = AppDataSource.getRepository(User)
    const addresRepository = AppDataSource.getRepository(Address)
    const advertisementRepository = AppDataSource.getRepository(Advertisement)


    const user = await userRepository.findOne({
            where:{
                email,
            }
        })

        if (!user) {
            throw new Error("User not found.");
    
        }

        const userAddress = await addresRepository.findOne({
            where:{
                id:user?.address.id
            }
        })




    const updatedUser = {
        id: user.id,
        name: name || user.name,
        email: email || user.email,
        cpf: cpf || user.cpf,
        password: password ? bcrypt.hashSync(password,10) : user.password,
        description: description || user.description,
        cell_phone: cell_phone || user.cell_phone,
        birthday: birthday || user.birthday,
        createdAt: user.createdAt,
        updatedAt: new Date()

    }

    const updatedAddress = {
        id: userAddress?.id,
        cep: address.cep || userAddress?.cep,
        city: address.city || userAddress?.city,
        street: address.street || userAddress?.street,
        number: address.number || userAddress?.number,
        complement: address.complement || userAddress?.complement,
        updatedAt: new Date(),
        
    }
    await addresRepository.update(userAddress!.id,updatedAddress)
    await userRepository.update(user!.id, updatedUser)

   const userReturned = {
    id: updatedUser.id,
    name:  updatedUser.name,
    email:  updatedUser.email,
    cpf:  updatedUser.cpf,
    description: updatedUser.description,
    cell_phone:  updatedUser.cell_phone,
    birthday:  updatedUser.birthday,
    createdAt: updatedUser.createdAt,
    updatedAt: new Date(),
    address
   }
  
   return userReturned
    
}

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