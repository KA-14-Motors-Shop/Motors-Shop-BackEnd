import { UserLoginParams, UserUpdateParams } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { Address } from "../../entities/addresses.entity";
import bcrypt from "bcrypt";
import { Advertisement } from "../../entities/advertisements.entity";
import AppError from "../../errors/AppError";

export default class UserUpdateService {
  static async userUpdateService(data: UserUpdateParams, userEmail: string) {
    const userRepository = AppDataSource.getRepository(User);
    const addresRepository = AppDataSource.getRepository(Address);

    const user = await userRepository.findOne({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const userAddress = await addresRepository.findOne({
      where: {
        id: user?.address.id,
      },
    });

    const updatedUser = {
      id: user.id,
      name: data.name || user.name,
      email: data.email || user.email,
      cpf: data.cpf || user.cpf,
      password: data.password
        ? bcrypt.hashSync(data.password, 10)
        : user.password,
      description: data.description || user.description,
      cell_phone: data.cell_phone || user.cell_phone,
      birthday: data.birthday || user.birthday,
      createdAt: user.createdAt,
      updatedAt: new Date(),
    };

    const updatedAddress = {
      id: userAddress?.id,
      cep: data.address.cep || userAddress?.cep,
      city: data.address.city || userAddress?.city,
      street: data.address.street || userAddress?.street,
      state: data.address.state || userAddress?.state,
      number: data.address.number || userAddress?.number,
      complement: data.address.complement || userAddress?.complement,
      updatedAt: new Date(),
    };
    await addresRepository.update(userAddress!.id, updatedAddress);
    await userRepository.update(user!.id, updatedUser);

    const userReturned = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      cpf: updatedUser.cpf,
      description: updatedUser.description,
      cell_phone: updatedUser.cell_phone,
      birthday: updatedUser.birthday,
      createdAt: updatedUser.createdAt,
      updatedAt: new Date(),
      updatedAddress,
    };

    return userReturned;
  }
}
