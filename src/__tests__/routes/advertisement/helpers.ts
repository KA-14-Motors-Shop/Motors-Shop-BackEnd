import {
  AdvertisementType,
  VehicleType,
} from "../../../entities/advertisements.entity";
import CreateAdvertisementService from "../../../services/advertisement/CreateAdvertisement.service";
import UserCreateService from "../../../services/user/userCreate.service";
import UserLoginService from "../../../services/user/userLogin.service";

export const getOwner = async (
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

export const getToken = async (
  cpf: string = "123456",
  email: string = "test@mail.com",
  cell_phone: string = "12345678"
) => {
  const owner = await getOwner(cpf, email, cell_phone);

  const token = await UserLoginService.userLoginService({
    email: owner.email,
    password: "1234",
  });

  return [owner.email, token];
};

export const createAd = async (
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
