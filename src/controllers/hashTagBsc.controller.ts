import { Request, Response } from "express"
import { hashTagBscService } from "../services/hashTagBsc.service";
import { catchAsync } from "../utils/catchAsync"

const createHashtag = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const data = await hashTagBscService.createHashtag(body);
  res.send(data);
})

const getListHashtagByBscType = catchAsync(async (req: Request, res: Response) => {
  const bscType = req.query.bscType;
  const data = await hashTagBscService.getListHashtagByBscType(bscType);
  res.send(data);
})

const getListHashTag = catchAsync(async (req: Request, res: Response) => {
  const data = await hashTagBscService.getListHashTag();
  res.send(data);
})

const getHashtag = catchAsync(async (req: Request, res: Response) => {
  const hashTagId = req.params.hashTagId;
  const data = await hashTagBscService.getHashtag(hashTagId);
  res.send(data);
})

const createHashTag = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const data = await hashTagBscService.createHashtag(body);
  res.send(data);
})

export const hashTagBscController = {
  getListHashtagByBscType,
  getHashtag,
  createHashtag,
  createHashTag,
  getListHashTag
}