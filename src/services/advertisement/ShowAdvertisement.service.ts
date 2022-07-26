import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisements.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

export default class ShowAdvertisementService {
  static async execute(ad_id: string) {
    const userRepo = AppDataSource.getRepository(User);
    const adRepo = AppDataSource.getRepository(Advertisement);
    const ad = await adRepo.findOne({
      where: { id: ad_id },
    });
    if (!ad) {
      throw new AppError("Ad not found", 404);
    }
    const users = await userRepo.find();

    const adOwner = users.find((user) =>
      user.advertisements.some((adv) => adv.id === ad.id)
    );

    const completedComments = ad.comments.map((comment) => {
      const commentUser = users.find((user) =>
        user.comments.some(({ id }) => id === comment.id)
      );

      return {
        id: comment.id,
        value: comment.value,
        createdAt: comment.createdAt,
        user: { id: commentUser?.id, name: commentUser?.name },
      };
    });

    return {
      ...ad,
      owner: {
        id: adOwner?.id,
        name: adOwner?.name,
        description: adOwner?.description,
        is_active: adOwner?.is_active,
      },
      comments: completedComments,
    };
  }
}
