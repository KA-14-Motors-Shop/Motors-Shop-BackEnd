import { DeleteResult } from "typeorm";
import { AppDataSource } from "../../../data-source";
import {
  AdvertisementType,
  VehicleType,
} from "../../../entities/advertisements.entity";
import { UserType } from "../../../entities/users.entity";
import CreateAdvertisementService from "../../../services/advertisement/CreateAdvertisement.service";
import DeleteImageService from "../../../services/image/DeleteImage.service";
import UserCreateService from "../../../services/user/userCreate.service";

describe("Delete Image", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should delete an image", async () => {
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
    const title = "test title 345";
    const year = 20300;
    const mileage = 154000;
    const price = 300020;
    const description = "test desc";
    const vehicle_type = VehicleType.CAR;
    const is_active = true;
    const images = [
      { url: "testurl@img.com", is_front: true },
      { url: "testurl2@img.com", is_front: false },
      { url: "testurl3@img.com", is_front: false },
    ];
    const userEmail = owner.email;

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

    const img = newAd.images.find(({ url }) => url === "testurl3@img.com");

    const delImage = await DeleteImageService.execute(img.id);

    expect(delImage).toBeInstanceOf(DeleteResult);
  });
});
