import { UserCreationParams, UserLoginParams } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { Address } from "../../entities/addresses.entity";
import { hash } from "bcrypt";
import AppError from "../../errors/AppError";

export default class UserCreateService {
  static async creationService({
    name,
    cpf,
    email,
    password,
    description,
    cell_phone,
    birthday,
    address,
  }: UserCreationParams) {
    const userRepository = AppDataSource.getRepository(User);
    const addresRepository = AppDataSource.getRepository(Address);

    const emailAlreadyExists = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (emailAlreadyExists) {
      throw new AppError("This email already exists!", 404);
    }

    const userAddress = addresRepository.create({ ...address });

    await addresRepository.save(userAddress);

    const passwordHashed = await hash(password, 10);

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
      // advertisements:[]
    });

    await userRepository.save(user);

    return user;
  }

  }
