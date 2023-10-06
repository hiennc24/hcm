import { Request, Response } from "express"
import { periodBscService } from "../services/periodBsc.service";
import { catchAsync } from "../utils/catchAsync"

const createPeriod = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const data = await periodBscService.createPeriod(body);
  res.send(data);
})

const getListPeriodByBscType = catchAsync(async (req: Request, res: Response) => {
  const bscType = req.query.bscType;
  const data = await periodBscService.getListPeriodByBscType(bscType);
  res.send(data);
})

const getPeriodById = catchAsync(async (req: Request, res: Response) => {
  const periodId = req.params.periodId;
  const data = await periodBscService.getPeriodById(periodId);
  res.send(data);
})

export const periodBscController = {
  createPeriod,
  getListPeriodByBscType,
  getPeriodById
}