import { UserLoginParams, UserUpdateParams } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { Address } from "../../entities/addresses.entity";
import bcrypt from "bcrypt";
import { Advertisement } from "../../entities/advertisements.entity";


export default class UserUpdateService {

    static async userUpdateService({name, cpf, email, password, description, cell_phone, birthday, address,id} : UserUpdateParams){
        const userRepository = AppDataSource.getRepository(User)
        const addresRepository = AppDataSource.getRepository(Address)
      
    
    
        const user = await userRepository.findOne({
                where:{
                    id,
                }
            })
    console.log(user)
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

}