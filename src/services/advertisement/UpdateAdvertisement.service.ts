import { AppDataSource } from "../../data-source";
import {
  Advertisement,
  AdvertisementType,
  VehicleType,
} from "../../entities/advertisements.entity";
import { Image } from "../../entities/images.entity";
import AppError from "../../errors/AppError";
import { ImagesRequest } from "../../interfaces/image";

interface AdUpdateParams {
  type?: AdvertisementType;
  title?: string;
  year?: number;
  mileage?: number;
  price?: number;
  description?: string;
  vehicle_type?: VehicleType;
}

export default class UpdateAdvertisementService {
  static async execute(
    data: AdUpdateParams,
    images: ImagesRequest[],
    ad: Advertisement
  ) {
    const adRepo = AppDataSource.getRepository(Advertisement);
    const imgRepo = AppDataSource.getRepository(Image);

    data.type ? (ad.type = data.type) : ad.type;
    data.title ? (ad.title = data.title) : ad.title;
    data.year ? (ad.year = data.year) : ad.year;
    data.mileage ? (ad.mileage = data.mileage) : ad.mileage;
    data.price ? (ad.price = data.price) : ad.price;
    data.description ? (ad.description = data.description) : ad.description;
    data.vehicle_type ? (ad.vehicle_type = data.vehicle_type) : ad.vehicle_type;

    await adRepo.save(ad);

    if (images.some(({ is_front }) => is_front === true)) {
      const actualFrontImage = ad.images.find(
        ({ is_front }) => is_front === true
      );

      if (actualFrontImage) {
        await imgRepo.delete(actualFrontImage.id);
      }
    }

    for (let i = 0; i < images.length; i++) {
      const vehicleImage = new Image();
      vehicleImage.url = images[i].url;
      vehicleImage.is_front = images[i].is_front;
      vehicleImage.advertisement = ad;

      const newImage = imgRepo.create(vehicleImage);
      await imgRepo.save(newImage);
    }

    return adRepo.findOne({ where: { id: ad.id } });
  }
}
