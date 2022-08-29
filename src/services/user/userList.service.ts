import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { instanceToPlain } from "class-transformer";
import AppError from "../../errors/AppError";

export default class UserListService {
  static async listMyProfileService(email: string) {
    const userRepository = AppDataSource.getRepository(User);

    
    const user = await userRepository.findOne({
      where: {
        email,
      },
    });
    
    if (!user) { 
      throw new AppError("User not found!", 404)
    }

    return instanceToPlain(user);
  }
}
