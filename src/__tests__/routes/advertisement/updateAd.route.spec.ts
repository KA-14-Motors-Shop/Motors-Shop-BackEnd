import path from "path";
import request from "supertest";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  AdvertisementType,
  VehicleType,
} from "../../../entities/advertisements.entity";
import { getToken, createAd } from "./helpers";

describe("Update ad route", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should be able to update an ad", async () => {
    const userInfos = await getToken("000002", "test3@mail.com", "999992");
    const ad = await createAd(
      AdvertisementType.AUCTION,
      "title update test",
      6000,
      0,
      54000,
      "update desc",
      VehicleType.CAR,
      true,
      userInfos[0]
    );

    const newFrontImage = path.resolve(
      __dirname,
      "../../imagesTest/carroFrontTests.jpg"
    );
    const newGalleryImage = path.resolve(
      __dirname,
      "../../imagesTest/carroteste.jpg"
    );

    const response = await request(app)
      .patch(`/ads/${ad.id}`)
      .set("Authorization", `Bearer ${userInfos[1]}`)
      .attach("front", newFrontImage)
      .attach("image", newGalleryImage)
      .field("year", 2001)
      .field("price", 28000);

    const frontImage = response.body.images.filter(
      ({ is_front }: any) => is_front === true
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.year).toBe(2001);
    expect(response.body.price).toBe("28000.00");
    expect(response.body.images.length).toBe(4);
    expect(frontImage.length).toBe(1);
  });
});
