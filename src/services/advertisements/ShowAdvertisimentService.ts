import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisements.entity";

export default class ShowAdvertisimentService {
  async execute(ad_id: string) {
    const adRepo = AppDataSource.getRepository(Advertisement);
    const ad = await adRepo.findOne({
      where: { id: ad_id },
    });
    return ad;
  }
}
