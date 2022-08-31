import request from "supertest";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  AdvertisementType,
  VehicleType,
} from "../../../entities/advertisements.entity";
import { getToken, createAd } from "../advertisement/helpers";

describe("Delete image route", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should be able to delete an image", async () => {
    const tokenInfos = await getToken("000002", "test3@mail.com", "999992");
    const ad = await createAd(
      AdvertisementType.AUCTION,
      "testing title del image",
      21000,
      0,
      40200,
      "test desc",
      VehicleType.CAR,
      true,
      tokenInfos[0]
    );

    const img = ad.images.find(({ url }) => url === "testurl3@img.com");

    const response = await request(app)
      .delete(`/ads/${ad.id}/image/${img.id}`)
      .auth(`${tokenInfos[1]}`, { type: "bearer" });
    console.log(response.body);
    expect(response.status).toBe(204);
  });
});
