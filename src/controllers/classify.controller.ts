import { Request, Response } from "express"
import { classifyBscService } from "../services/classifyBsc.service";
import { catchAsync } from "../utils/catchAsync"

const createClassify = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const data = await classifyBscService.createClassify(body);
  res.send(data);
})

const getListClassifyByBscType = catchAsync(async (req: Request, res: Response) => {
  const bscType = req.query.bscType;
  const data = await classifyBscService.getListClassifyByBscType(bscType);
  res.send(data);
})

const getClassifyById = catchAsync(async (req: Request, res: Response) => {
  const classifyId = req.params.classifyId;
  const data = await classifyBscService.getClassifyById(classifyId);
  res.send(data);
})

export const classifyBscController = {
  createClassify,
  getListClassifyByBscType,
  getClassifyById
}