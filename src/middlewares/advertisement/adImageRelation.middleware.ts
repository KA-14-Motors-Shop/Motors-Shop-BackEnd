import { NextFunction, Request, Response } from "express";

const adImageRelationMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { advertisement } = request;
  const { img_id } = request.params;

  if (!advertisement.images.some((img) => img.id === img_id)) {
    return response.status(400).json({
      status: "error",
      code: 400,
      message: "This image is not from this ad",
    });
  }

  next();
};

export default adImageRelationMiddleware;
