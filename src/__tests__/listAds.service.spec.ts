import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import ListAdvertisementsService from "../services/advertisement/ListAdvertisements.service";

describe("List advertisements", () => {
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

  test("Should list all advertisements", async () => {
    const adList = await ListAdvertisementsService.execute();
    expect(adList).toHaveProperty("map");
  });
});
