import {
  Advertisement,
  AdvertisementType,
  VehicleType,
} from "../../entities/advertisements.entity";
import { AppDataSource } from "../../data-source";
import { Image } from "../../entities/images.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { ImagesRequest } from "../../interfaces/image";

interface AdDataParams {
  type: AdvertisementType;
  title: string;
  year: number;
  mileage: number;
  price: number;
  description: string;
  vehicle_type: VehicleType;
  is_active: boolean;
}

export default class CreateAdvertisementService {
  static async execute(
    data: AdDataParams,
    userEmail: string,
    images: ImagesRequest[]
  ) {
    const adRepo = AppDataSource.getRepository(Advertisement);
    const imgRepo = AppDataSource.getRepository(Image);
    const userRepo = AppDataSource.getRepository(User);

    const owner = await userRepo.findOne({ where: { email: userEmail } });

    if (!owner) throw new AppError("Invalid user", 400);

    const ad = adRepo.create(data);
    ad.owner = owner;
    await adRepo.save(ad);

    for (let i = 0; i < images.length; i++) {
      const vehicleImage = new Image();
      vehicleImage.url = images[i].url;
      vehicleImage.is_front = images[i].is_front;
      vehicleImage.advertisement = ad;

      const newImage = imgRepo.create(vehicleImage);
      await imgRepo.save(newImage);
    }

    return ad;
  }
}
