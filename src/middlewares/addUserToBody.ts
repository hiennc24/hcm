import { Request, Response } from 'express';
import { RequestParams } from '../types';

export const addDataToBody = (body: { [x: string]: RequestParams }) => (req: Request, res: Response, next: any) => {
  console.log("addDataToBody")
  Object.keys(body).forEach((key) => {
    req.body[key] = req[body[key]];
    if (key == "deletedById") {
      req.body.deletedAt = new Date();
    }
  })
  next()
}

export const addParamToBody = (paramsKeys: string[]) => (req: Request, res: Response, next: any) => {
  console.log("addParamToBody")
  paramsKeys.forEach((key) => {
    req.body[key] = req.params[key];
  })
  next()
}
