import { AppDataSource } from "../../../data-source";
import {
  Advertisement,
  AdvertisementType,
  VehicleType,
} from "../../../entities/advertisements.entity";
import { UserType } from "../../../entities/users.entity";
import CreateAdvertisementService from "../../../services/advertisement/CreateAdvertisement.service";
import UpdateAdvertisementService from "../../../services/advertisement/UpdateAdvertisement.service";
import UserCreateService from "../../../services/user/userCreate.service";

describe("Updating an advertisement", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should update an ad", async () => {
    const owner = await UserCreateService.creationService({
      name: "test",
      cpf: "123456",
      email: "test@mail.com",
      password: "1234",
      description: "aylmao",
      cell_phone: "12345",
      birthday: "1999-01-01",
      type: UserType.ADVERTISER,
      address: {
        cep: "123456",
        state: "teststate",
        city: "testc",
        street: "street",
        number: 69,
        complement: "ay lmao",
      },
    });

    const type = AdvertisementType.SALE;
    const title = "test title";
    const year = 2000;
    const mileage = 15000;
    const price = 30000;
    const description = "test desc";
    const vehicle_type = VehicleType.CAR;
    const is_active = true;
    const images = [
      { url: "testurl@img.com", is_front: true },
      { url: "testurl2@img.com", is_front: false },
    ];
    const userEmail = "test@mail.com";

    const newAd = await CreateAdvertisementService.execute(
      {
        type,
        title,
        year,
        mileage,
        price,
        description,
        vehicle_type,
        is_active,
      },
      userEmail,
      images
    );

    const updateData = {
      type: AdvertisementType.AUCTION,
      title: "test title update",
      year: 2001,
      mileage: 10000,
      price: 40000,
    };
    const newImages = [
      { url: "newurl@img.com", is_front: true },
      { url: "newurl2@img.com", is_front: false },
    ];

    const adRepo = AppDataSource.getRepository(Advertisement);
    const ad = await adRepo.findOne({
      where: { id: newAd.id },
    });

    const updatedAd = await UpdateAdvertisementService.execute(
      updateData,
      newImages,
      ad as Advertisement
    );

    expect(updatedAd?.type).toBe(AdvertisementType.AUCTION);
    expect(updatedAd?.title).toBe(updateData.title);
    expect(updatedAd?.year).toBe(updateData.year);
    expect(updatedAd?.mileage).toBe(updateData.mileage);
    expect(updatedAd?.price).toBe("40000.00");
    expect(
      updatedAd?.images.find(({ is_front }) => is_front === true)?.url
    ).toBe(newImages[0].url);
    expect(updatedAd?.images.length).toBe(3);
  });
});
