import { AppDataSource } from "../../data-source";
import { Image } from "../../entities/images.entity";
import AppError from "../../errors/AppError";

export default class DeleteImageService {
  static async execute(image_id: string) {
    const imageRepository = AppDataSource.getRepository(Image);

    const image = await imageRepository.findOne({
      where: {
        id: image_id,
      },
    });

    if (!image) {
      throw new AppError("Image not found");
    }

    return imageRepository.delete(image_id);
  }
}
