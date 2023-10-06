import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { productGroupService } from '../services/productGroup.service';
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.body;
  const position = await productGroupService.getCount({
    companyId
  })

  try {
    const data = await productGroupService.create({ ...req.body, position });
    res.send(data)
  } catch (err: any) {
    return next(new ApiError(httpStatus.NOT_FOUND, err.message));
  }
});
const getdetail = catchAsync(async (req: Request, res: Response) => {
  // const filter = pick(req.query, ['departmentId', 'personnelPositionId', 'createdById']);
  // const options = pick(req.query, ['limit', 'page']);
  const data = await productGroupService.getById(req.params.productGroupId);
  res.send(data)
});

const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await productGroupService.updateOne(
    { _id: req.params.productGroupId, companyId: req.companyId }, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'product_group.not_found'));
  }
  res.send(data)
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const { searchJson, itemGroupCodes, position, ...others }: any = req.query;
  const itemGroupCodesArr = JSON.parse(itemGroupCodes || "[]");
  const data = await productGroupService.getAll({
    companyId: req.companyId,
    ...JSON.parse(searchJson?.toString() || "{}"),
    ...itemGroupCodesArr.length > 0 ? { itemGroupCode: { $in: itemGroupCodesArr } } : {},
    ...others
  }, position);
  res.send(data)
});

const dedeteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const [data] = await Promise.all([
    productGroupService.updateOne(
      { _id: req.params.productGroupId, companyId: req.companyId }, req.body
    ),
    productGroupService.rearrangeOrder({
      companyId: req.companyId, _id: { $ne: req.params.productGroupId }
    })
  ]);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const deleteMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await productGroupService.deleteMany(req.body);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const updateMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await
    productGroupService.updateMany(req.body)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

export const productGroupController = {
  getAll,
  create,
  updateOne,
  dedeteOne,
  getdetail,
  deleteMany,
  updateMany,
}
