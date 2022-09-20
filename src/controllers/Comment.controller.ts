import { Request, Response } from "express";
import CreateCommentService from "../services/comment/CreateComment.service";

export default class CommentController {
  static async store(req: Request, res: Response) {
    const { userEmail } = req;
    const { ad_id } = req.params;
    const comment = await CreateCommentService.execute(
      req.body,
      userEmail,
      ad_id
    );

    return res.status(201).json(comment);
  }
}
