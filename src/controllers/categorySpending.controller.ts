import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { categorySpendingService } from '../services/categorySpending.service';
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';
import { PROCESS_TYPES } from '../types';


const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line prefer-const
  let { parentId, companyId } = req.body;
  const key = req.params.key;
  const position = await categorySpendingService.getCount({
    companyId
  })
  let processType = PROCESS_TYPES.MPROJECT;
  if (!!parentId) {
    const parent = await categorySpendingService.getById(parentId, key)
    if (!parent) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Parent Not found'));
    }

    const { processType: pProcessType } = parent;

    if (pProcessType == PROCESS_TYPES.MTASK1) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Parent Invalid'));
    }

    if (pProcessType == PROCESS_TYPES.MPROJECT) {
      processType = PROCESS_TYPES.MPHASE;
    } else if (pProcessType == PROCESS_TYPES.MPHASE) {
      processType = PROCESS_TYPES.MTASK;
    }
    else if (pProcessType == PROCESS_TYPES.MTASK) {
      processType = PROCESS_TYPES.MTASK1;
    }
  }

  const data = await categorySpendingService.create({
    ...req.body,
    processType, key, position
  });
  res.send(data)
});


const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const key = req.params.key;
  const categorySpendingId = req.params.categorySpendingId
  const data = await categorySpendingService.updateOne(
    categorySpendingId, key, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'not_found'));
  }
  res.send(data)
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const { searchJson, isPublic, ...others }: any = req.query;
  const administrationListId = req.params.administrationListId
  const key = req.params.key;
  const data = await categorySpendingService.getAll(
    administrationListId,
    key,
    {
      ...JSON.parse(searchJson?.toString() || "{}"),
      isPublic,
      ...others
    }
  );
  res.send(data)
});

const dedeteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const key = req.params.key;
  const categorySpendingId = req.params.categorySpendingId
  const [data] = await Promise.all([
    categorySpendingService.updateOne(
      categorySpendingId, key, req.body
    ),
  ]);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});
const getdetail = catchAsync(async (req: Request, res: Response) => {
  const key = req.params.key;
  const categorySpendingId = req.params.categorySpendingId
  const data = await categorySpendingService.getById(categorySpendingId, key);
  res.send(data)
});

const deleteMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await
    categorySpendingService.deleteMany(req.body)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const updateMany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await
    categorySpendingService.updateMany(req.body)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

export const categorySpendingController = {
  getAll,
  create,
  updateOne,
  dedeteOne,
  getdetail,
  deleteMany,
  updateMany,
}
