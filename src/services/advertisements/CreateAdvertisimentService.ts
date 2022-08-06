import {
  Advertisement,
  AdvertisementType,
  VehicleType,
} from "../../entities/advertisements.entity";
import { AppDataSource } from "../../data-source";

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

export default class CreateAdvertisimentService {
  async execute(data: AdDataParams) {
    const adRepo = AppDataSource.getRepository(Advertisement);
    const ad = adRepo.create(data);
    await adRepo.save(ad);
    return ad;
  }
}
