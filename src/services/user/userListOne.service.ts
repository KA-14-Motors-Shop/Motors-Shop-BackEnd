import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { instanceToPlain } from "class-transformer";
import AppError from "../../errors/AppError";

export default class UserListOneProfile {
  static async userListOne(id: string) {
    const userRepository = AppDataSource.getRepository(User);

    const userListed = await userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userListed) { 
      throw new AppError("User not found!", 404)
    }

    return instanceToPlain(userListed);
  }
}
