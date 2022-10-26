import { AppDataSource } from "../../../data-source";
import { UserType } from "../../../entities/users.entity";
import UserCreateService from "../../../services/user/userCreate.service";
import UserLoginService from "../../../services/user/userLogin.service";

describe("Login with a new user", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should be able to make a login with an user", async () => {
    const newUser = {
      name: "User test",
      cpf: "12345678911",
      email: "usertest@email.com",
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

    await UserCreateService.creationService(newUser);

    const userLoggedIn = await UserLoginService.userLoginService({
      email: "usertest@email.com",
      password: "1234",
    });

    console.log("Here :" + userLoggedIn.length);
    expect(userLoggedIn).toBeTruthy();
    expect(userLoggedIn).toHaveLength(167);
  });
});
