import { AppDataSource } from "../../../data-source";
import {
  AdvertisementType,
  VehicleType,
} from "../../../entities/advertisements.entity";
import { UserType } from "../../../entities/users.entity";
import CreateAdvertisementService from "../../../services/advertisement/CreateAdvertisement.service";
import ToggleIsActiveAdService from "../../../services/advertisement/ToggleIsActiveAd.service";
import UserCreateService from "../../../services/user/userCreate.service";

describe("Should toggle an advertisement is active status", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should toggle is active of an ad", async () => {
    const owner = await UserCreateService.creationService({
      name: "test",
      cpf: "1234560",
      email: "test3@mail.com",
      password: "1234",
      description: "aylmao",
      cell_phone: "0123456",
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
    const title = "test title";
    const year = 2000;
    const mileage = 15000;
    const price = 30000;
    const description = "test desc";
    const vehicle_type = VehicleType.CAR;
    const is_active = true;
    const images = [
      { url: "testurl@img.com", is_front: true },
      { url: "testurl2@img.com", is_front: false },
    ];
    const userEmail = "test3@mail.com";

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

    expect(newAd.is_active).toBe(true);
    const toggleAd = await ToggleIsActiveAdService.execute(newAd.id);
    expect(toggleAd?.is_active).toBe(false);
  });
});
