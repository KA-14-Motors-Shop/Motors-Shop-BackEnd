import request from "supertest";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  AdvertisementType,
  VehicleType,
} from "../../../entities/advertisements.entity";
import { getToken, createAd } from "./helpers";

describe("Toggle is_active ad route", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should be able to toggle an ad's is_active status", async () => {
    const [ownerEmail, token] = await getToken(
      "000002",
      "test3@mail.com",
      "999992"
    );
    const ad = await createAd(
      AdvertisementType.AUCTION,
      "testing title 8979",
      20400,
      0,
      402000,
      "test desc",
      VehicleType.CAR,
      true,
      ownerEmail
    );

    let response = await request(app)
      .patch(`/ads/status/${ad.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.body.id).toEqual(ad.id);
    expect(response.body.is_active).toEqual(false);

    response = await request(app)
      .patch(`/ads/status/${ad.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.body.is_active).toEqual(true);
  });
});
