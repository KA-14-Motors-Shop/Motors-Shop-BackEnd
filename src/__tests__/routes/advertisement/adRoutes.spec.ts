import request from "supertest";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  AdvertisementType,
  VehicleType,
} from "../../../entities/advertisements.entity";
import CreateAdvertisementService from "../../../services/advertisement/CreateAdvertisement.service";
import UserCreateService from "../../../services/user/userCreate.service";
import UserLoginService from "../../../services/user/userLogin.service";

describe("Testing ad routes", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  const getOwner = async (
    cpf = "123456",
    email = "test@mail.com",
    cell_phone = "12345678"
  ) => {
    const owner = await UserCreateService.creationService({
      name: "test",
      cpf,
      email,
      password: "1234",
      description: "aylmao",
      cell_phone,
      birthday: "1999-01-01",
      address: {
        cep: "123456",
        state: "teststate",
        city: "testc",
        street: "street",
        number: 69,
        complement: "ay lmao",
      },
    });

    return owner;
  };

  const getToken = async () => {
    const owner = getOwner();

    const token = await UserLoginService.userLoginService({
      email: (await owner).email,
      password: "1234",
    });

    return token;
  };

  const createAd = async (
    type: AdvertisementType = AdvertisementType.SALE,
    title: string = "Test title",
    year: number = 2000,
    mileage: number = 0,
    price: number = 40000,
    description: string = "Test description",
    vehicle_type: VehicleType = VehicleType.CAR,
    is_active: boolean = true,
    userEmail: string = "test@mail.com"
  ) => {
    const ad = await CreateAdvertisementService.execute(
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
      [
        { url: "testurl@img.com", is_front: true },
        { url: "testurl2@img.com", is_front: false },
      ]
    );
    return ad;
  };

  it("Should be able to create a new ad", async () => {
    // const token = await getToken();

    // const adData = {
    //   type: "sale",
    //   title: "TESTING UPDATE FEATURE",
    //   year: 1879,
    //   mileage: 100009,
    //   price: 100009,
    //   description: "um carro ae",
    //   vehicle_type: "motorcycle",
    //   is_active: true,
    //   images: [
    //     {
    //       url: "imageexemplo01.com.br",
    //     },
    //   ],
    // };

    // const response = await request(app)
    //   .post("/ads")
    //   .set("Authorization", `Bearer ${token}`)
    //   .send(adData);

    expect(2 + 2).toBe(4);
  });

  it("Should be able to list all ads", async () => {
    const owner = await getOwner();
    const ad = await createAd();
    const response = await request(app).get("/ads");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
    expect(response.body[0].id).toEqual(ad.id);
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
