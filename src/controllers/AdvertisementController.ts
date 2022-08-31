import CreateAdvertisementService from "../services/advertisement/CreateAdvertisement.service";
import { Request, Response } from "express";
import ListAdvertisementsService from "../services/advertisement/ListAdvertisements.service";
import ShowAdvertisementService from "../services/advertisement/ShowAdvertisement.service";
import ToggleIsActiveAdService from "../services/advertisement/ToggleIsActiveAd.service";
import UpdateAdvertisementService from "../services/advertisement/UpdateAdvertisement.service";
import DeleteImageService from "../services/image/DeleteImage.service";

export default class AdvertisementController {
  static async store(req: Request, res: Response) {
    const { userEmail } = req;
    const { firebaseUrls } = req;
    const ad = await CreateAdvertisementService.execute(
      req.body,
      userEmail,
      firebaseUrls
    );

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

  static async update(req: Request, res: Response) {
    const { advertisement } = req;
    const { firebaseUrls } = req;

    const ad = await UpdateAdvertisementService.execute(
      req.body,
      firebaseUrls,
      advertisement
    );

    return res.json(ad);
  }

  static async toggleActive(req: Request, res: Response) {
    const { ad_id } = req.params;
    const ad = await ToggleIsActiveAdService.execute(ad_id);
    return res.status(200).json(ad);
  }

  static async deleteImage(req: Request, res: Response) {
    const { img_id } = req.params;
    await DeleteImageService.execute(img_id);

    return res.status(204).json();
  }
}
