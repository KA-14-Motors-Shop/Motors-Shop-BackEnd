import * as express from "express";
import { Advertisement } from "../../src/entities/advertisements.entity";
import { ImagesRequest } from "../../src/interfaces/image";

export declare global {
  namespace Express {
    export interface Request {
      userEmail: string;
    }

    export interface Request {
      userId: any;
    }

    export interface Request {
      firebaseUrls: ImagesRequest[];
    }

    export interface Request {
      advertisement: Advertisement;
    }
  }
}
