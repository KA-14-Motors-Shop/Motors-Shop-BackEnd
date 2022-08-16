import { Advertisement } from "../../entities/advertisements.entity";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";

export default class ToggleIsActiveAdService {
  static async execute(ad_id: string) {
    const adRepo = AppDataSource.getRepository(Advertisement);
    const ad = await adRepo.findOne({
      where: { id: ad_id },
    });
    if (!ad) {
      throw new AppError("Ad not found", 404);
    }
    // await adRepo.update(ad!.id, { is_active: !ad?.is_active });
    ad!.is_active = !ad?.is_active;
    await adRepo.save(ad as any);
    return ad;
  }
}
