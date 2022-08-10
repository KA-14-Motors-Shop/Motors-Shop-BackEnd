import * as express from 'express'

export declare global {
    namespace Express {
     export interface Request {
        userEmail: string 
      }

      export interface Request{
        userId: any
      }
    }
}
