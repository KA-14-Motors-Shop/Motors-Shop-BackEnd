import { UserLoginParams } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserLoginService {
  static async userLoginService({ email, password }: UserLoginParams) {
    const userRepository = AppDataSource.getRepository(User);

    const userAccount = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!userAccount) {
      throw new Error("Account not found!");
    }

    if (!bcrypt.compareSync(password, userAccount.password)) {
      throw new Error("Wrong Email/Password. I can't say...");
    }

    const token = jwt.sign({ email: email }, String(process.env.SECRET_KEY), {
      expiresIn: "24h",
    });

    return token;
  }
}
