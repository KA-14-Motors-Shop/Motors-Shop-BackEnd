import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import {
  AdvertisementType,
  VehicleType,
} from "../entities/advertisements.entity";
import { Image } from "../entities/images.entity";
import CreateAdvertisementService from "../services/advertisement/CreateAdvertisement.service";
import ShowAdvertisementService from "../services/advertisement/ShowAdvertisement.service";

describe("Show an advertisement", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should return the ad corresponding to an id", async () => {
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

    const showAd = await ShowAdvertisementService.execute(newAd.id);
    expect(showAd!.id).toEqual(newAd.id);
    expect(showAd!.title).toEqual(newAd.title);
  });
});
