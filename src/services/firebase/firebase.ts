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
  let images: Express.Multer.File[] | any = request.files;

  if (!images) {
    return next();
  }

  const urlImages = images.image.map((element: multerFile) => {
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
    return { url: stringFire, is_front: false };
  });

  const frontImage = images.front[0];
  const frontName = Date.now() + "." + frontImage.originalname.split(".").pop();

  const file = bucket.file(frontName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: frontImage.mimetype,
    },
  });

  const stringFire = `https://storage.googleapis.com/${BUCKET}/${frontName}`;

  stream.on("finish", async () => {
    await file.makePublic();
  });
  stream.end(frontImage.buffer);

  urlImages.push({ url: stringFire, is_front: true });

  request.firebaseUrls = urlImages;
  next();
};
