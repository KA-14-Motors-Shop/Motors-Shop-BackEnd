import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import {
  AdvertisementType,
  VehicleType,
} from "../entities/advertisements.entity";
import { Image } from "../entities/images.entity";
import CreateAdvertisementService from "../services/advertisement/CreateAdvertisement.service";

describe("Create an advertisement", () => {
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

  test("Should insert the new ad in the database", async () => {
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

    expect(newAd).toEqual(
      expect.objectContaining({
        type,
        title,
        year,
        mileage,
        price,
        description,
        vehicle_type,
        is_active,
        images,
      })
    );

    expect(newAd.type).toEqual(type);
    expect(newAd.title).toEqual(title);
    expect(newAd.year).toEqual(year);
    expect(newAd.mileage).toEqual(mileage);
    expect(newAd.price).toEqual(price);
    expect(newAd.description).toEqual(description);
    expect(newAd.vehicle_type).toEqual(vehicle_type);
    expect(newAd.is_active).toEqual(is_active);
    expect(newAd.images[0]).toEqual(image);
  });
});
