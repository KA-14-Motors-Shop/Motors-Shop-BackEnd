import { AppDataSource } from "../../../data-source";
import {
  AdvertisementType,
  VehicleType,
} from "../../../entities/advertisements.entity";
import { UserType } from "../../../entities/users.entity";
import CreateAdvertisementService from "../../../services/advertisement/CreateAdvertisement.service";
import UserCreateService from "../../../services/user/userCreate.service";

describe("Create an advertisement", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should insert the new ad in the database", async () => {
    const owner = await UserCreateService.creationService({
      name: "test",
      cpf: "123456",
      email: "test@mail.com",
      password: "1234",
      description: "aylmao",
      cell_phone: "12345",
      birthday: "1999-01-01",
      type: UserType.ADVERTISER,
      address: {
        cep: "123456",
        state: "teststate",
        city: "testc",
        street: "street",
        number: 69,
        complement: "ay lmao",
      },
    });

    const type = AdvertisementType.SALE;
    const title = "test title 3424";
    const year = 203400;
    const mileage = 154000;
    const price = 300300;
    const description = "test desc";
    const vehicle_type = VehicleType.CAR;
    const is_active = true;
    const images = [
      { url: "testurl@img.com", is_front: true },
      { url: "testurl2@img.com", is_front: false },
    ];
    const userEmail = "test@mail.com";

    const newAd = await CreateAdvertisementService.execute(
      {
        type,
        title,
        year,
        mileage,
        price,
        description,
        vehicle_type,
        is_active,
      },
      userEmail,
      images
    );

    expect(newAd).toHaveProperty("id");

    expect(newAd.owner.id).toBe(owner.id);
  });
});
