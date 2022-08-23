import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

export default class UserDeleteService {
  static async userDeleteService(email: string) {
    const userRepository = AppDataSource.getRepository(User);

    const userToDelete = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!userToDelete) {
        throw new AppError("User not found!", 404)
    }

    await userRepository.delete(userToDelete!.id);

    return true;
  }
}
