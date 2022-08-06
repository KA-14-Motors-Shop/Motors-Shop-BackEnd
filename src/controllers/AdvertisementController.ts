import CreateAdvertisimentService from "../services/advertisements/CreateAdvertisimentService";
import { Request, Response } from "express";

export default class AdvertisimentController {
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
      images,
    } = req.body;

    const createAd = new CreateAdvertisimentService();

    const ad = await createAd.execute({
      type,
      title,
      year,
      mileage,
      price,
      description,
      vehicle_type,
      is_active,
      images,
    });

    return res.status(201).json(ad);
  }
}
