import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { objectUserService } from '../services/objectUser.service';
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.body;
  const position = await objectUserService.getCount({
    companyId
  })

  try {
    const data = await objectUserService.create({ ...req.body, position });
    res.send(data)
  } catch (err: any) {
    return next(new ApiError(httpStatus.NOT_FOUND, err.message));
  }
});

const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await objectUserService.updateOne(
    { _id: req.params.objectUserId, companyId: req.companyId }, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'product_category.not_found'));
  }
  res.send(data)
});
const getdetail = catchAsync(async (req: Request, res: Response) => {
  // const filter = pick(req.query, ['departmentId', 'personnelPositionId', 'createdById']);
  // const options = pick(req.query, ['limit', 'page']);
  const data = await objectUserService.getById(req.params.objectUserId);
  res.send(data)
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const { searchJson, names, ...others }: any = req.query;
  const namesArr = JSON.parse(names || "[]");
  const data = await objectUserService.getAll({
    companyId: req.companyId,
    ...JSON.parse(searchJson?.toString() || "{}"),
    ...namesArr.length > 0 ? { name: { $in: namesArr } } : {},
    ...others
  });
  res.send(data)
});

const dedeteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const [data] = await Promise.all([
    objectUserService.updateOne(
      { _id: req.params.objectUserId, companyId: req.companyId }, req.body
    ),
    objectUserService.rearrangeOrder({
      companyId: req.companyId, _id: { $ne: req.params.objectUserId }
    })
  ]);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

export const objectUserController = {
  getAll,
  create,
  updateOne,
  dedeteOne, getdetail,
}
