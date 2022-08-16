import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import {
  AdvertisementType,
  VehicleType,
} from "../../../entities/advertisements.entity";
import { Image } from "../../../entities/images.entity";
import CreateAdvertisementService from "../../../services/advertisement/CreateAdvertisement.service";
import UpdateAdvertisementService from "../../../services/advertisement/UpdateAdvertisement.service";
import UserCreateService from "../../../services/user/userCreate.service";

describe("Updating an advertisement", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should update an ad", async () => {
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
    const image = new Image();
    image.url = "testurl@img.com";
    const type = AdvertisementType.SALE;
    const title = "test title";
    const year = 2000;
    const mileage = 15000;
    const price = 30000;
    const description = "test desc";
    const vehicle_type = VehicleType.CAR;
    const is_active = true;
    const images = [image];
    const userEmail = "test@mail.com";

    const newAd = await CreateAdvertisementService.execute({
      type,
      title,
      year,
      mileage,
      price,
      description,
      vehicle_type,
      is_active,
      images,
      userEmail,
    });

    const updateData = {
      ad_id: newAd.id,
      type: AdvertisementType.AUCTION,
      title: "test title update",
      year: 2001,
      mileage: 10000,
      price: 40000,
    };

    const updatedAd = await UpdateAdvertisementService.execute(updateData);

    expect(updatedAd.type).toBe(AdvertisementType.AUCTION);
    expect(updatedAd.title).toBe(updateData.title);
    expect(updatedAd.year).toBe(updateData.year);
    expect(updatedAd.mileage).toBe(updateData.mileage);
    expect(updatedAd.price).toBe(updateData.price);
  });
});
