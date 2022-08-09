import {
  Advertisement,
  AdvertisementType,
  VehicleType,
} from "../../entities/advertisements.entity";
import { AppDataSource } from "../../data-source";
import { Image } from "../../entities/images.entity";

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
}

export default class CreateAdvertisementService {
  static async execute(data: AdDataParams) {
    const adRepo = AppDataSource.getRepository(Advertisement);
    const imgRepo = AppDataSource.getRepository(Image);
    const ad = adRepo.create(data);
    await adRepo.save(ad);

    data.images.forEach(async (img) => {
      const image = imgRepo.create(img);
      image.advertisement = ad;
      await imgRepo.save(image);
    });

    return ad;
  }
}
