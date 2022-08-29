import request from "supertest";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  AdvertisementType,
  VehicleType,
} from "../../../entities/advertisements.entity";
import { getOwner, createAd } from "./helpers";

describe("Show ad route", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should be able to list one specific ad using it's id", async () => {
    const owner = await getOwner("000001", "test2@mail.com", "999991");
    const ad = await createAd(
      AdvertisementType.AUCTION,
      "testing title",
      2000,
      0,
      40000,
      "test desc",
      VehicleType.CAR,
      true,
      owner.email
    );
    const response = await request(app).get(`/ads/${ad.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(ad.id);
    expect(response.body.title).toEqual(ad.title);
    expect(response.body.description).toEqual(ad.description);
  });
});
