import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { channelService } from '../services/channel.service';
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.body;
  const position = await channelService.getCount({
    companyId
  })

  try {
    const data = await channelService.create({ ...req.body, position });
    res.send(data)
  } catch (err: any) {
    return next(new ApiError(httpStatus.NOT_FOUND, err.message));
  }
});

const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await channelService.updateOne(
    { _id: req.params.channelId, companyId: req.companyId }, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'product_category.not_found'));
  }
  res.send(data)
});
const getdetail = catchAsync(async (req: Request, res: Response) => {
  // const filter = pick(req.query, ['departmentId', 'personnelPositionId', 'createdById']);
  // const options = pick(req.query, ['limit', 'page']);
  const data = await channelService.getById(req.params.channelId);
  res.send(data)
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const { searchJson, channelCodes, ...others }: any = req.query;
  const channelCodesArr = JSON.parse(channelCodes || "[]");
  const data = await channelService.getAll({
    companyId: req.companyId,
    ...JSON.parse(searchJson?.toString() || "{}"),
    ...channelCodesArr.length > 0 ? { channelCode: { $in: channelCodesArr } } : {},
    ...others
  });
  res.send(data)
});

const dedeteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const [data] = await Promise.all([
    channelService.updateOne(
      { _id: req.params.channelId, companyId: req.companyId }, req.body
    ),
  ]);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

export const channelController = {
  getAll,
  create,
  updateOne,
  dedeteOne, getdetail,
}
