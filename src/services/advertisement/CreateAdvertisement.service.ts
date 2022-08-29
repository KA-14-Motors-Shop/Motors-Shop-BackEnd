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

    let adImgs: any[] = [];

    for (let i = 0; i < images.length; i++) {
      const vehicleImage = new Image();
      vehicleImage.url = images[i].url;
      vehicleImage.is_front = images[i].is_front;
      vehicleImage.advertisement = ad;
      adImgs = [
        ...adImgs,
        { url: vehicleImage.url, is_front: vehicleImage.is_front },
      ];

      const newImage = imgRepo.create(vehicleImage);
      await imgRepo.save(newImage);
    }

    return {
      id: ad.id,
      type: ad.type,
      title: ad.title,
      year: ad.year,
      mileage: ad.mileage,
      price: ad.price,
      description: ad.description,
      vehicle_type: ad.vehicle_type,
      is_active: ad.is_active,
      createdAt: ad.createdAt,
      updatedAt: ad.updatedAt,
      images: adImgs,
      owner: {
        id: owner.id,
        name: owner.name,
        email: owner.email,
        cpf: owner.cpf,
        cell_phone: owner.cell_phone,
        birthday: owner.birthday,
        description: owner.description,
        type: owner.type,
        is_active: owner.is_active,
        address: owner.address,
      },
    };
  }
}
