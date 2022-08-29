import { UserLoginParams } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";

export default class UserLoginService {
  static async userLoginService({ email, password }: UserLoginParams) {
    const userRepository = AppDataSource.getRepository(User);

    
    const userAccount = await userRepository.findOne({
      where: {
        email,
      },
    });
    
    if (!userAccount) { 
      throw new AppError("User not found!", 404)
    }

    if (!bcrypt.compareSync(password, userAccount.password)) {
      throw new AppError("Wrong Email/Password. I can't say...", 400);
    }

    const token = jwt.sign({ email: email }, String(process.env.SECRET_KEY), {
      expiresIn: "24h",
    });

    return token;
  }
}
