import { Request, Response } from "express"
import { unitBscService } from "../services/unitBsc.service";
import { catchAsync } from "../utils/catchAsync"

const createUnit = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const data = await unitBscService.createUnit(body);
  res.send(data);
})

const getListUnitByBscType = catchAsync(async (req: Request, res: Response) => {
  const bscType = req.query.bscType;
  const data = await unitBscService.getListUnitByBscType(bscType);
  res.send(data);
})

const getUnitById = catchAsync(async (req: Request, res: Response) => {
  const unitId = req.params.unitId;
  const data = await unitBscService.getUnitById(unitId);
  res.send(data);
})

export const unitBscController = {
  createUnit,
  getListUnitByBscType,
  getUnitById
}