import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { materialsSpareService } from '../services/MaterialsSpare.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
// import { pick } from '../utils/pick';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.body;
  const position = await materialsSpareService.getCount({
    companyId
  })

  try {
    const data = await materialsSpareService.create({ ...req.body, position });
    res.send(data)
  } catch (err: any) {
    return next(new ApiError(httpStatus.NOT_FOUND, err.message));
  }
});

const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await materialsSpareService.updateOne(
    { _id: req.params.materialsSpareId, companyId: req.companyId }, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'meterialsSpare.not_found'));
  }
  res.send(data)
});

// const getList = catchAsync(async (req: Request, res: Response) => {
//   // const filter = pick(req.query, ['departmentId', 'personnelPositionId', 'createdById']);
//   // const options = pick(req.query, ['limit', 'page']);
//   const data = await materialsSpareService.getById({
//     companyId: req.companyId
//   });
//   res.send(data)
// });

const getdetail = catchAsync(async (req: Request, res: Response) => {
  // const filter = pick(req.query, ['departmentId', 'personnelPositionId', 'createdById']);
  // const options = pick(req.query, ['limit', 'page']);
  const data = await materialsSpareService.getById(req.params.materialsSpareId);
  res.send(data)
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const { searchJson, commodityCodes, isPublic, ...others }: any = req.query;
  const commodityCodesArr = JSON.parse(commodityCodes || "[]");
  const data = await materialsSpareService.getAll({
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
    materialsSpareService.updateOne(
      { _id: req.params.materialsSpareId, companyId: req.companyId }, req.body
    ),
    materialsSpareService.rearrangeOrder({
      companyId: req.companyId, _id: { $ne: req.params.materialsSpareId }
    })
  ]);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const deleteMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await materialsSpareService.deleteMany(req.body);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const updateMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await
    materialsSpareService.updateMany(req.body)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

export const materialsSpareController = {
  create,
  getAll,
  updateOne,
  dedeteOne,
  getdetail,
  deleteMany,
  updateMany,
}
