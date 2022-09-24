import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import UserDeleteService from "../../services/user/useDelete.service";
import UserCreateService from "../../services/user/userCreate.service";
import UserListService from "../../services/user/userList.service";
import UserListOneProfile from "../../services/user/userListOne.service";
import UserLoginService from "../../services/user/userLogin.service";
import UserUpdateService from "../../services/user/userUpdate.service";

export default class UserController {
  static async store(req: Request, res: Response) {
    try {
      const {
        name,
        cpf,
        email,
        password,
        description,
        cell_phone,
        birthday,
        address,
        type,
      } = req.body;

      const newUser = await UserCreateService.creationService({
        name,
        cpf,
        email,
        password,
        description,
        cell_phone,
        birthday,
        address,
        type,
      });

      return res.status(201).send(newUser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
    }
  }

  static async index(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);

    const allUsers = await userRepository.find();

    let newList: any = [];

    allUsers.forEach((elem: any) => {
      const { password, ...noPassword }: { password: string; noPassword: any } =
        elem;

      newList.push(noPassword);
    });

    return res.json(newList);
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await UserLoginService.userLoginService({
      email,
      password,
    });

    return res.status(201).json({ Token_JWT: token });
  }

  static async indexMyProfile(req: Request, res: Response) {
    const globalEmail = req.userEmail;

    const uniqueUser = await UserListService.listMyProfileService(globalEmail);

    return res.status(200).send(uniqueUser);
  }

  static async indexOneProfilePerId(req: Request, res: Response) {
    const { id } = req.params;

    const listedUser = await UserListOneProfile.userListOne(id);

    return res.status(200).send(listedUser);
  }

  static async update(req: Request, res: Response) {
    const globalId = req.userId;

    // const {
    //   name,
    //   cpf,
    //   email, 
    //   password,
    //   description,
    //   cell_phone,
    //   birthday,
    //   address,
    // } = req.body;
    console.log(req.body)
    const newUser = await UserUpdateService.userUpdateService(req.body, globalId);

    return res.status(201).json({
      message: "User updated!",
      user: { ...newUser },
    });
  }

  static async delete(req: Request, res: Response) {
    const globalEmail = req.userEmail;

    const deletedUser = await UserDeleteService.userDeleteService(globalEmail);

    return res.status(200).json({
      message: `User deleted!`,
    });
  }
}
