const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CompanyModel } from '../models';
import { accessTokenService } from '../services/accessTokenService';
import { BearTokenType } from '../types';
import ApiError from '../utils/ApiError';

export function bisoAuth(req: Request, res: Response, next: any) {
  console.log("bisoAuth start")
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return next(new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized"))

  jwt.verify(token, process.env.PRIVATE_KEY as string, async (err: any, data: BearTokenType) => {

    if (err) return next(new ApiError(httpStatus.UNAUTHORIZED, "TOKEN_INVALID"))

    const accessToken = await accessTokenService.findOne({
      _id: data.accesstoken,
    })
    if (!!accessToken) {
      console.log("userId", accessToken.user.toString())
      req.userId = accessToken.user.toString();
      req.companyId = accessToken.userInfo.company.toString();
      next()
    } else {
      return next(new ApiError(httpStatus.UNAUTHORIZED, "TOKEN_INVALID"))
    }
  })
}

export async function companyInfo(req: Request, res: Response, next: any) {
  const comp = await CompanyModel.findById(req.companyId);
  if (!!comp) {
    req.companyInfo = comp;
    next()
  } else {
    return next(new ApiError(httpStatus.UNAUTHORIZED, "TOKEN_INVALID"))
  }
}
