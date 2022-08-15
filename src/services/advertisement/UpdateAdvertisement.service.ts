import { AppDataSource } from "../../data-source";
import {
  Advertisement,
  AdvertisementType,
  VehicleType,
} from "../../entities/advertisements.entity";

import { Image } from "../../entities/images.entity";
import AppError from "../../errors/AppError";

interface AdUpdateParams {
  ad_id: string;
  type?: AdvertisementType;
  title?: string;
  year?: number;
  mileage?: number;
  price?: number;
  description?: string;
  vehicle_type?: VehicleType;
  images?: Image[];
  isAddingImage?: boolean;
}

export default class UpdateAdvertisementService {
  static async execute(data: AdUpdateParams) {
    const adRepo = AppDataSource.getRepository(Advertisement);
    const imgRepo = AppDataSource.getRepository(Image);

    const ad = await adRepo.findOne({ where: { id: data.ad_id } });

    if (!ad) {
      throw new AppError("Ad not found", 404);
    }

    data.type ? (ad.type = data.type) : ad.type;
    data.title ? (ad.title = data.title) : ad.title;
    data.year ? (ad.year = data.year) : ad.year;
    data.mileage ? (ad.mileage = data.mileage) : ad.mileage;
    data.price ? (ad.price = data.price) : ad.price;
    data.description ? (ad.description = data.description) : ad.description;
    data.vehicle_type ? (ad.vehicle_type = data.vehicle_type) : ad.vehicle_type;

    if (data.images) {
      if (data.isAddingImage) {
        data.images.forEach(async (img) => {
          const image = imgRepo.create(img);
          ad.images = [...ad.images, image];
          await imgRepo.save(image);
          await adRepo.save(ad);
        });
      } else {
        ad.images = []; //TODO: FAZER DELEÇÃO UM UM POR UM COM O DATA SOURCE E FOR EACH
        data.images.forEach(async (img) => {
          const image = imgRepo.create(img);
          ad.images = [...ad.images, image];
          await imgRepo.save(image);
          await adRepo.save(ad);
        });
      }
    }
    await adRepo.save(ad);
    return ad;
  }
}
