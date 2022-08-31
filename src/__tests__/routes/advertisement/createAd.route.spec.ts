import path from "path";
import request from "supertest";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { getToken } from "./helpers";

describe("Create ad route", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should be able to create an ad", async () => {
    const userInfos = await getToken("000002", "test3@mail.com", "999992");

    const frontImage = path.resolve(
      __dirname,
      "../../imagesTest/carroFrontTests.jpg"
    );
    const galleryImage = path.resolve(
      __dirname,
      "../../imagesTest/carroteste.jpg"
    );

    const response = await request(app)
      .post(`/ads`)
      .auth(`${userInfos[1]}`, { type: "bearer" })
      .attach("front", frontImage)
      .attach("image", galleryImage)
      .attach("image", galleryImage)
      .field("type", "sale")
      .field("title", "Carro muito bom")
      .field("year", 2000)
      .field("mileage", 35120)
      .field("price", 25499)
      .field("description", "Um palio um pouco velho mas conservado")
      .field("vehicle_type", "car")
      .field("is_active", true);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.images.length).toBe(3);
  });
});
