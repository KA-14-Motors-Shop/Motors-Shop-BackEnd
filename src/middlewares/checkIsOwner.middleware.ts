import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { Request, Response, NextFunction } from "express";
import { Advertisement } from "../entities/advertisements.entity";
import AppError from "../errors/AppError";

export const checkIsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User);
  const adRepo = AppDataSource.getRepository(Advertisement);

  const { ad_id } = req.params;

  const user = await userRepo.findOne({ where: { email: req.userEmail } });
  const ad = await adRepo.findOne({ where: { id: ad_id } });

  if (user?.advertisements.some((elem) => elem.id === ad!.id)) {
    next();
  } else {
    return res
      .status(401)
      .json({ error: "unauthorized", message: "user is not the owner" });
  }
};
