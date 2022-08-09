import CreateAdvertisimentService from "../services/advertisement/CreateAdvertisimentService";
import { Request, Response } from "express";
import ListAdvertisimentsService from "../services/advertisement/ListAdvertisimentsService";
import ShowAdvertisimentService from "../services/advertisement/ShowAdvertisimentService";
import ToggleIsActiveAdService from "../services/advertisement/ToggleIsActiveAdService";

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

    const ad = await CreateAdvertisimentService.execute({
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

  static async index(req: Request, res: Response) {
    const ads = await ListAdvertisimentsService.execute();
    return res.status(200).json(ads);
  }

  static async show(req: Request, res: Response) {
    const { ad_id } = req.params;
    const ad = await ShowAdvertisimentService.execute(ad_id);
    return res.status(200).json(ad);
  }

  static async toggleActive(req: Request, res: Response) {
    const { ad_id } = req.params;
    const ad = await ToggleIsActiveAdService.execute(ad_id);
    return res.status(200).json(ad);
  }
}
