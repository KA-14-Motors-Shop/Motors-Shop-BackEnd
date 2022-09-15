import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisements.entity";
import { Comment, CommentAdType } from "../../entities/comments.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

interface CommentRequest {
  type: CommentAdType;
  value: string | number;
}

export default class CreateCommentService {
  static async execute(
    data: CommentRequest,
    userEmail: string,
    advertisementId: string
  ) {
    const commentRepository = AppDataSource.getRepository(Comment);
    const adRepository = AppDataSource.getRepository(Advertisement);
    const userRepository = AppDataSource.getRepository(User);

    if (data.type === CommentAdType.AUCTION && typeof data.value !== "number") {
      throw new AppError("Invalid comment", 400);
    }

    const user = await userRepository.findOne({ where: { email: userEmail } });

    if (!user) throw new AppError("User not found", 404);

    const advertisement = await adRepository.findOne({
      where: { id: advertisementId },
    });

    if (!advertisement) throw new AppError("Advertisement not found", 404);

    const comment = new Comment();
    comment.type = data.type;
    comment.value = String(data.value);
    comment.advertisement = advertisement;
    comment.user = user;

    const newComment = commentRepository.create(comment);
    await commentRepository.save(newComment);

    return {
      ...newComment,
      advertisement: { id: advertisement.id, title: advertisement.title },
      user: { id: user.id, name: user.name },
    };
  }
}
