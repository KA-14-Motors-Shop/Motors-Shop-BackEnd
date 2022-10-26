import { AppDataSource } from "../../../data-source";

import UserCreateService from "../../../services/user/userCreate.service";
import UserListService from "../../../services/user/userList.service";
import { UserType } from "../../../entities/users.entity";

describe("List my profile", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("It should be able to list my profile", async () => {
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

    const newUser = await UserCreateService.creationService(user_1);

    const myProfile = await UserListService.listMyProfileService(user_1.email);

    expect(myProfile).toHaveProperty("email");
    expect(myProfile.email).toEqual("usertest@email.com");
  });
});
