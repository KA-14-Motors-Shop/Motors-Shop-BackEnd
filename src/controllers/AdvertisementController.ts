import CreateAdvertisementService from "../services/advertisement/CreateAdvertisement.service";
import { Request, Response } from "express";
import ListAdvertisementsService from "../services/advertisement/ListAdvertisements.service";
import ShowAdvertisementService from "../services/advertisement/ShowAdvertisement.service";
import ToggleIsActiveAdService from "../services/advertisement/ToggleIsActiveAd.service";

export default class AdvertisementController {
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
    const { userEmail } = req;
    const ad = await CreateAdvertisementService.execute({
      type,
      title,
      year,
      mileage,
      price,
      description,
      vehicle_type,
      is_active,
      images,
      userEmail,
    });

    return res.status(201).json(ad);
  }

  static async index(req: Request, res: Response) {
    const ads = await ListAdvertisementsService.execute();
    return res.status(200).json(ads);
  }

  static async show(req: Request, res: Response) {
    const { ad_id } = req.params;
    const ad = await ShowAdvertisementService.execute(ad_id);
    return res.status(200).json(ad);
  }

  static async toggleActive(req: Request, res: Response) {
    const { ad_id } = req.params;
    const ad = await ToggleIsActiveAdService.execute(ad_id);
    return res.status(200).json(ad);
  }
}
