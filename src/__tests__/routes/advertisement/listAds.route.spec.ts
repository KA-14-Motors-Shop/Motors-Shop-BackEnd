import request from "supertest";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { getOwner, createAd } from "./helpers";

describe("Testing list all ads route", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should be able to list all ads", async () => {
    const owner = await getOwner();
    const ad = await createAd();
    const response = await request(app).get("/ads");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
    expect(response.body[0].id).toEqual(ad.id);
  });
});
