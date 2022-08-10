import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { instanceToPlain } from "class-transformer";

export default class UserListOneProfile {
  static async userListOne(id: string) {
    const userRepository = AppDataSource.getRepository(User);

    const userListed = await userRepository.findOne({
      where: {
        id,
      },
    });

    return instanceToPlain(userListed);
  }
}
