import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { objectListService } from '../services/objectList.service';
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.body;
  const position = await objectListService.getCount({
    companyId
  })

  try {
    const data = await objectListService.create({ ...req.body, position });
    res.send(data)
  } catch (err: any) {
    return next(new ApiError(httpStatus.NOT_FOUND, err.message));
  }
});

const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await objectListService.updateOne(
    { _id: req.params.objectListId, companyId: req.companyId }, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'product_category.not_found'));
  }
  res.send(data)
});
const getdetail = catchAsync(async (req: Request, res: Response) => {
  // const filter = pick(req.query, ['departmentId', 'personnelPositionId', 'createdById']);
  // const options = pick(req.query, ['limit', 'page']);
  const data = await objectListService.getById(req.params.objectListId);
  res.send(data)
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const { searchJson, itemObjectCodes, isPublic, ...others }: any = req.query;
  const itemObjectCodesArr = JSON.parse(itemObjectCodes || "[]");
  const data = await objectListService.getAll({
    companyId: req.companyId,
    ...JSON.parse(searchJson?.toString() || "{}"),
    ...itemObjectCodesArr.length > 0 ? { itemObjectCode: { $in: itemObjectCodesArr } } : {},
    isPublic,
    ...others
  });
  res.send(data)
});

const dedeteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const [data] = await Promise.all([
    objectListService.updateOne(
      { _id: req.params.objectListId, companyId: req.companyId }, req.body
    ),
    objectListService.rearrangeOrder({
      companyId: req.companyId, _id: { $ne: req.params.objectListId }
    })
  ]);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const deleteMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await objectListService.deleteMany(req.body);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const updateMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await
    objectListService.updateMany(req.body)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

export const objectListController = {
  getAll,
  create,
  updateOne,
  dedeteOne,
  getdetail,
  deleteMany,
  updateMany,
}
