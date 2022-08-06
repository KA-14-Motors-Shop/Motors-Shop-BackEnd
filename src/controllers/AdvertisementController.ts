import CreateAdvertsimentService from "../services/advertisements/CreateAdvertsimentService";
import { Request, Response } from "express";

export default class AdvertsimentController {
  static async store(req: Request, res: Response) {
    const {
      type,
      title,
      year,
      mileage,
      price,
      description,
      vehicle_type,
      is_active,
    } = req.body;

    const createAd = new CreateAdvertsimentService();

    const ad = await createAd.execute({
      type,
      title,
      year,
      mileage,
      price,
      description,
      vehicle_type,
      is_active,
    });

    return res.status(201).json(ad);
  }
}
