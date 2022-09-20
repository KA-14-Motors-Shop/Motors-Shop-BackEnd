import { AppDataSource } from "../../../data-source";
import {
  AdvertisementType,
  VehicleType,
} from "../../../entities/advertisements.entity";
import { UserType } from "../../../entities/users.entity";
import CreateAdvertisementService from "../../../services/advertisement/CreateAdvertisement.service";
import UserCreateService from "../../../services/user/userCreate.service";
import CreateCommentService from "../../../services/comment/CreateComment.service";
import { CommentAdType } from "../../../entities/comments.entity";

describe("Create an comment", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should insert a new comment in the database", async () => {
    const adOwner = await UserCreateService.creationService({
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
        number: 98,
        complement: "ay lmao",
      },
    });

    const commentUser = await UserCreateService.creationService({
      name: "test2",
      cpf: "123466",
      email: "test2@mail.com",
      password: "12345",
      description: "aylmao",
      cell_phone: "123455",
      birthday: "1996-05-21",
      type: UserType.BUYER,
      address: {
        cep: "123446",
        state: "teststate",
        city: "testc",
        street: "street",
        number: 88,
        complement: "ay lmao",
      },
    });

    const advertisement = await CreateAdvertisementService.execute(
      {
        type: AdvertisementType.SALE,
        title: "test title 3424",
        year: 2012,
        price: 60000,
        mileage: 300300,
        description: "test desc",
        vehicle_type: VehicleType.CAR,
        is_active: true,
      },
      adOwner.email,
      [
        { url: "testurl@img.com", is_front: true },
        { url: "testurl2@img.com", is_front: false },
      ]
    );

    const comment = await CreateCommentService.execute(
      {
        type: CommentAdType.SALE,
        value: "Belo carro!",
      },
      commentUser.email,
      advertisement.id
    );

    expect(comment).toHaveProperty("id");
    expect(comment.user.id).toBe(commentUser.id);
  });
});
