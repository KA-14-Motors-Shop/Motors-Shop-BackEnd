import { Advertisement } from "../../entities/advertisements.entity";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";

export default class ListAdvertisementsService {
  static async execute() {
    const adRepo = AppDataSource.getRepository(Advertisement);
    const userRepo = AppDataSource.getRepository(User);

    const users = await userRepo.find();
    const ads = await adRepo.find();

    const adList = ads.map((ad) => {
      const owner = users.find((user) =>
        user.advertisements.some((adv) => adv.id === ad.id)
      );

      const serializedAd = {
        ...ad,
        owner: {
          id: owner?.id,
          name: owner?.name,
          email: owner?.email,
          type: owner?.type,
        },
      };

      return serializedAd;
    });

    return adList;
  }
}
