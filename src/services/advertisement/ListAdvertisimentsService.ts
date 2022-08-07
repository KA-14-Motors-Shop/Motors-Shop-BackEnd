import { Advertisement } from "../../entities/advertisements.entity";
import { AppDataSource } from "../../data-source";

export default class ListAdvertisimentsService {
  async execute() {
    const adRepo = AppDataSource.getRepository(Advertisement);
    const ads = await adRepo.find();
    return ads;
  }
}
