import { Advertisement } from "../../entities/advertisements.entity";
import { AppDataSource } from "../../data-source";

export default class ToggleIsActiveAdService {
  async execute(ad_id: string) {
    const adRepo = AppDataSource.getRepository(Advertisement);
    const ad = await adRepo.findOne({
      where: { id: ad_id },
    });
    // await adRepo.update(ad!.id, { is_active: !ad?.is_active });
    ad!.is_active = !ad?.is_active;
    await adRepo.save(ad as any);
    return ad;
  }
}
