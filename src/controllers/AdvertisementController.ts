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

  static async index(req: Request, res: Response) {
    const indexAds = new ListAdvertisimentsService();
    const ads = await indexAds.execute();
    return res.status(200).json(ads);
  }

  static async show(req: Request, res: Response) {
    const { ad_id } = req.params;
    const showAd = new ShowAdvertisimentService();
    const ad = await showAd.execute(ad_id);
    return res.status(200).json(ad);
  }

  static async toggleActive(req: Request, res: Response) {
    const { ad_id } = req.params;
    const toggleAd = new ToggleIsActiveAdService();
    const ad = await toggleAd.execute(ad_id);
    return res.status(200).json(ad);
  }
}
