import { Request, Response, NextFunction } from "express";

interface multerFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

var admin = require("firebase-admin");

var serviceAccount = require("../../config/firebase-key.json");

const BUCKET = "motors-shop.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

export const uploadImage = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let image: Express.Multer.File[] | any = request.files;

  if (!image) {
    return next();
  }

  const urlImages = image?.map((element: multerFile) => {
    const fileName = Date.now() + "." + element.originalname.split(".").pop();
    let stringFire = "";
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metaData: {
        contentType: element.mimetype,
      },
    });

    stream.on("error", (error: any) => {
      console.log(error);
    });

    stringFire = `https://storage.googleapis.com/${BUCKET}/${fileName}`;

    stream.on("finish", async () => {
      await file.makePublic();
    });
    stream.end(element.buffer);
    return stringFire;
  });

  request.firebaseUrls = urlImages;
  next();
};
