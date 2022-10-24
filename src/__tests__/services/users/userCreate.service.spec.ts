import { AppDataSource } from "../../../data-source";

import UserCreateService from "../../../services/user/userCreate.service";
import { UserType } from "../../../entities/users.entity";

describe("Create a new User", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should be able to create a new user in the database", async () => {
    // cria o usuário
    const newUser = await UserCreateService.creationService({
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
    });

    expect(newUser).toHaveProperty("id");
  });
});
