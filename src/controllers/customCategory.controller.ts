import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { customCategoryService } from '../services/customCategory.service';
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.body;
  const key = req.params.key;
  const position = await customCategoryService.getCount({
    companyId
  })

  try {
    const data = await customCategoryService.create({ ...req.body, key, position });
    res.send(data)
  } catch (err: any) {
    return next(new ApiError(httpStatus.NOT_FOUND, err.message));
  }
});

const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await customCategoryService.updateOne(
    { _id: req.params.customCategoryId, companyId: req.companyId }, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'product_category.not_found'));
  }
  res.send(data)
});
const getdetail = catchAsync(async (req: Request, res: Response) => {
  const data = await customCategoryService.getById(req.params.customCategoryId);
  res.send(data)
});


const getAll = catchAsync(async (req: Request, res: Response) => {
  const { searchJson, isPublic, ...others }: any = req.query;
  const key = req.params.key;
  const data = await customCategoryService.getAll(
    key,
    {
      ...JSON.parse(searchJson?.toString() || "{}"),
      isPublic,
      ...others,

    });
  res.send(data);
})


const dedeteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const [data] = await Promise.all([
    customCategoryService.updateOne(
      { _id: req.params.customCategoryId, companyId: req.companyId }, req.body
    ),
  ]);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const deleteMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await
    customCategoryService.deleteMany(req.body)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const updateMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await
    customCategoryService.updateMany(req.body)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

export const customCategoryController = {
  getAll,
  create,
  updateOne,
  dedeteOne,
  getdetail,
  deleteMany,
  updateMany,
}
