import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { commodityListService } from '../services/commodityList.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
// import { pick } from '../utils/pick';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.body;
  const position = await commodityListService.getCount({
    companyId
  })

  try {
    const data = await commodityListService.create({ ...req.body, position });
    res.send(data)
  } catch (err: any) {
    return next(new ApiError(httpStatus.NOT_FOUND, err.message));
  }
});

const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await commodityListService.updateOne(
    { _id: req.params.commodityListId, companyId: req.companyId }, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'commodityList.not_found'));
  }
  res.send(data)
});

// const getList = catchAsync(async (req: Request, res: Response) => {
//   // const filter = pick(req.query, ['departmentId', 'personnelPositionId', 'createdById']);
//   // const options = pick(req.query, ['limit', 'page']);
//   const data = await commodityListService.getById({
//     companyId: req.companyId
//   });
//   res.send(data)
// });
const getdetail = catchAsync(async (req: Request, res: Response) => {
  // const filter = pick(req.query, ['departmentId', 'personnelPositionId', 'createdById']);
  // const options = pick(req.query, ['limit', 'page']);
  const data = await commodityListService.getById(req.params.commodityListId);
  res.send(data)
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const { searchJson, commodityCodes, isPublic, ...others }: any = req.query;
  const commodityCodesArr = JSON.parse(commodityCodes || "[]");
  const data = await commodityListService.getAll({
    companyId: req.companyId,
    ...JSON.parse(searchJson?.toString() || "{}"),
    ...commodityCodesArr.length > 0 ? { commodityCode: { $in: commodityCodesArr } } : {},
    isPublic,
    ...others
  });
  res.send(data)
});

const dedeteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const [data] = await Promise.all([
    commodityListService.updateOne(
      { _id: req.params.commodityListId, companyId: req.companyId }, req.body
    ),
    commodityListService.rearrangeOrder({
      companyId: req.companyId, _id: { $ne: req.params.commodityListId }
    })
  ]);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const deleteMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await commodityListService.deleteMany(req.body);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const updateMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await
    commodityListService.updateMany(req.body)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});
export const commodityListController = {
  create,
  getAll,
  updateOne,
  dedeteOne,
  getdetail,
  deleteMany,
  updateMany,
}
