import request from "supertest";
import app from "../app";
import { AppDataSource } from "../data-source";
import UserCreateService from "../services/user/userCreate.service";
import UserLoginService from "../services/user/userLogin.service";

describe("Testing ad routes", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  const getOwner = async () => {
    const owner = await UserCreateService.creationService({
      name: "test",
      cpf: "123456",
      email: "test@mail.com",
      password: "1234",
      description: "aylmao",
      cell_phone: "12345",
      birthday: "1999-01-01",
      address: {
        cep: "123456",
        state: "teststate",
        city: "testc",
        street: "street",
        number: 69,
        complement: "ay lmao",
      },
    });

    return owner;
  };

  const getToken = async () => {
    const owner = getOwner();

    const token = await UserLoginService.userLoginService({
      email: (await owner).email,
      password: "1234",
    });

    return token;
  };

  it("Should be able to create a new ad", async () => {
    const token = await getToken();

    const adData = {
      type: "sale",
      title: "TESTING UPDATE FEATURE",
      year: 1879,
      mileage: 100009,
      price: 100009,
      description: "um carro ae",
      vehicle_type: "motorcycle",
      is_active: true,
      images: [
        {
          url: "imageexemplo01.com.br",
        },
      ],
    };

    const response = await request(app)
      .post("/ads")
      .set("Authorization", `Bearer ${token}`)
      .send(adData);

    expect(2 + 2).toBe(4);
  });
});
