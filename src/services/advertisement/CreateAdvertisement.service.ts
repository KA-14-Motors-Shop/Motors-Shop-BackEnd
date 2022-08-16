import {
  Advertisement,
  AdvertisementType,
  VehicleType,
} from "../../entities/advertisements.entity";
import { AppDataSource } from "../../data-source";
import { Image } from "../../entities/images.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

interface AdDataParams {
  type: AdvertisementType;
  title: string;
  year: number;
  mileage: number;
  price: number;
  description: string;
  vehicle_type: VehicleType;
  is_active: boolean;
  images: Image[];
  userEmail: string;
}

export default class CreateAdvertisementService {
  static async execute(data: AdDataParams) {
    const adRepo = AppDataSource.getRepository(Advertisement);
    const imgRepo = AppDataSource.getRepository(Image);
    const userRepo = AppDataSource.getRepository(User);

    const owner = await userRepo.findOne({ where: { email: data.userEmail } });

    const ad = adRepo.create(data);
    if (!owner) throw new AppError("Invalid user", 400);
    ad.owner = owner;
    await adRepo.save(ad);

    data.images.forEach(async (img) => {
      const image = imgRepo.create(img);
      image.advertisement = ad;
      await imgRepo.save(image);
    });

    return ad;
  }
}
