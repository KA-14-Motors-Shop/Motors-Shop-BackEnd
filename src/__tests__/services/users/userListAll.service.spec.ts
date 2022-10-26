import { AppDataSource } from "../../../data-source";

import UserCreateService from "../../../services/user/userCreate.service";
import { UserType } from "../../../entities/users.entity";
import UserController from "../../../controllers/user/UserController";

describe("List all the users", () => {
  const user_1 = {
    name: "User test",
    cpf: "12345678912",
    email: "usertest@email.com",
    password: "1234",
    description: "Lorem ipsum Dolor",
    cell_phone: "5561999999998",
    birthday: "1999-01-01",
    type: UserType.BUYER,
    address: {
      cep: "12345678",
      state: "State test",
      city: "City test",
      street: "Street test",
      number: 22,
      complement: "Lorem ipsum Dolor",
    },
  };

  const user_2 = {
    name: "User test 2",
    cpf: "12345678911",
    email: "usertest2@email.com",
    password: "1234",
    description: "Lorem ipsum Dolor",
    cell_phone: "5561999999999",
    birthday: "1999-01-01",
    type: UserType.BUYER,
    address: {
      cep: "12345678",
      state: "State test",
      city: "City test",
      street: "Street test",
      number: 22,
      complement: "Lorem ipsum Dolor",
    },
  };

  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should be able to list all the user on the database", async () => {
    const newUser = await UserCreateService.creationService(user_1);
    const newUser2 = await UserCreateService.creationService(user_2);
    const userList = UserController.index;

    expect(newUser).toHaveProperty("id");
    expect(newUser2).toHaveProperty("id");
    expect(userList).toHaveLength(2);
    expect(userList).toBeTruthy();
  });
});
