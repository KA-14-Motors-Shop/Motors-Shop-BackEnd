import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import ListAdvertisementsService from "../services/advertisement/ListAdvertisements.service";

describe("List advertisements", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should list all advertisements", async () => {
    const adList = await ListAdvertisementsService.execute();
    expect(adList).toHaveProperty("map");
  });
});
