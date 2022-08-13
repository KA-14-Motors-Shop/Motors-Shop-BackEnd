import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisements.entity";
import AppError from "../../errors/AppError";

export default class ShowAdvertisementService {
  static async execute(ad_id: string) {
    const adRepo = AppDataSource.getRepository(Advertisement);
    const ad = await adRepo.findOne({
      where: { id: ad_id },
    });
    if (!ad) {
      throw new AppError("Ad not found", 404);
    }
    return ad;
  }
}
