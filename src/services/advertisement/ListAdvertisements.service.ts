import { Advertisement } from "../../entities/advertisements.entity";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";

export default class ListAdvertisementsService {
  static async execute() {
    const adRepo = AppDataSource.getRepository(Advertisement);
    const userRepo = AppDataSource.getRepository(User);

    const users = await userRepo.find();
    const ads = await (await adRepo.find()).filter((ad) => ad.is_active);

    const adList = ads.map((ad) => {
      const owner = users.find((user) =>
        user.advertisements.some((adv) => adv.id === ad.id)
      );

      const fronImage = ad.images.find(({ is_front }) => is_front === true);

      const serializedAd = {
        ...ad,
        images: fronImage,
        owner: {
          id: owner?.id,
          name: owner?.name,
        },
      };

      return serializedAd;
    });

    return adList;
  }
}
