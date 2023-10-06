import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { servicesService } from '../services/services.services';
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.body;
  const position = await servicesService.getCount({
    companyId
  })

  try {
    const data = await servicesService.create({ ...req.body, position });
    res.send(data)
  } catch (err: any) {
    return next(new ApiError(httpStatus.NOT_FOUND, err.message));
  }
});

const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await servicesService.updateOne(
    { _id: req.params.servicesId, companyId: req.companyId }, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'product_category.not_found'));
  }
  res.send(data)
});
const getdetail = catchAsync(async (req: Request, res: Response) => {
  // const filter = pick(req.query, ['departmentId', 'personnelPositionId', 'createdById']);
  // const options = pick(req.query, ['limit', 'page']);
  const data = await servicesService.getById(req.params.servicesId);
  res.send(data)
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const { searchJson, itemGroupCodes, isPublic, ...others }: any = req.query;
  const itemGroupCodesArr = JSON.parse(itemGroupCodes || "[]");
  const data = await servicesService.getAll({
    companyId: req.companyId,
    ...JSON.parse(searchJson?.toString() || "{}"),
    ...itemGroupCodesArr.length > 0 ? { itemGroupCode: { $in: itemGroupCodesArr } } : {},
    isPublic,
    ...others
  });
  res.send(data)
});

const dedeteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const [data] = await Promise.all([
    servicesService.updateOne(
      { _id: req.params.servicesId, companyId: req.companyId }, req.body
    ),
    servicesService.rearrangeOrder({
      companyId: req.companyId, _id: { $ne: req.params.servicesId }
    })
  ]);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const deleteMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await servicesService.deleteMany(req.body);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const updateMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await
    servicesService.updateMany(req.body)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});
export const servicesController = {
  getAll,
  create,
  updateOne,
  dedeteOne,
  getdetail,
  deleteMany,
  updateMany,
}
