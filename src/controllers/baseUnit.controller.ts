import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { baseUnitService } from '../services/baseUnit.service';
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.body;
  const position = await baseUnitService.getCount({
    companyId
  })

  try {
    const data = await baseUnitService.create({ ...req.body, position });
    res.send(data)
  } catch (err: any) {
    return next(new ApiError(httpStatus.NOT_FOUND, err.message));
  }
});

const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await baseUnitService.updateOne(
    { _id: req.params.baseUnitId, companyId: req.companyId }, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'product_category.not_found'));
  }
  res.send(data)
});
const getdetail = catchAsync(async (req: Request, res: Response) => {
  // const filter = pick(req.query, ['departmentId', 'personnelPositionId', 'createdById']);
  // const options = pick(req.query, ['limit', 'page']);
  const data = await baseUnitService.getById(req.params.baseUnitId);
  res.send(data)
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const { searchJson, baseUnitCodes, ...others }: any = req.query;
  // const baseUnitCodeArr = JSON.parse(baseUnitCodes || "[]");
  const data = await baseUnitService.getAll({
    companyId: req.companyId,
    ...JSON.parse(searchJson?.toString() || "{}"),
    // ...baseUnitCodeArr.length > 0 ? { baseUnitCode: { $in: baseUnitCodeArr } } : {},
    ...others
  });
  res.send(data)
});

const dedeteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const [data] = await Promise.all([
    baseUnitService.updateOne(
      { _id: req.params.baseUnitId, companyId: req.companyId }, req.body
    ),
    baseUnitService.rearrangeOrder({
      companyId: req.companyId, _id: { $ne: req.params.baseUnitId }
    })
  ]);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

export const baseUnitController = {
  getAll,
  create,
  updateOne,
  dedeteOne, getdetail,
}
