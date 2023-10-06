import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { accountabilityService } from '../services/accountability.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { pick } from '../utils/pick';

const create = catchAsync(async (req: Request, res: Response) => {
  const dutyId = req.params.dutyId;
  const data = await accountabilityService.createAccountability({
    dutyId,
    ...req.body,
  });
  res.send(data)
});

const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await accountabilityService.updateById(
    req.params.accountabilityId, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});

const getList = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.params, ['dutyId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await accountabilityService.getList(filter, options);
  res.send(data)
});

const dedete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await accountabilityService.updateById(
    req.params.accountabilityId, req.body,
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const dutyId = req.params.dutyId
  const { departmentId } = pick(req.params, ['departmentId']);
  const data = await accountabilityService.getAll({ dutyId, departmentId });
  res.send(data)
});

const addMandate = catchAsync(async (req: Request, res: Response) => {
  const {
    dutyId, accountabilityId, personnelPositionId
  } = pick(req.params, ['dutyId', 'accountabilityId', 'personnelPositionId']);
  const { mandateKey } = req.body;
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await accountabilityService.addMandate({
    dutyId, accountabilityId
  }, personnelPositionId, mandateKey);
  res.send(data)
});
const removeMandate = catchAsync(async (req: Request, res: Response) => {
  const {
    dutyId, accountabilityId, personnelPositionId
  } = pick(req.params, ['dutyId', 'accountabilityId', 'personnelPositionId']);
  const { mandateKey } = req.body;
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await accountabilityService.removeMandate({
    dutyId, accountabilityId
  }, personnelPositionId, mandateKey);
  res.send(data)
});

const updateValueChain = catchAsync(async (req: Request, res: Response) => {
  const {
    accountabilityId
  } = pick(req.params, ['accountabilityId']);
  const { valueChainId, ...others } = req.body;
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await accountabilityService.updateById(accountabilityId, {
    ...others,
    work: {
      valueChainId
    }
  });
  res.send(data)
});
const updateBusinessProcess = catchAsync(async (req: Request, res: Response) => {
  const {
    accountabilityId
  } = pick(req.params, ['accountabilityId']);
  const { businessProcessId, ...others } = req.body;
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await accountabilityService.updateById(accountabilityId, {
    ...others,
    "work.businessProcessId": businessProcessId,
    $unset: {
      "work.segmentId": 1,
      "work.workIds": 1,
    },
  });
  res.send(data)
});

const updateSegment = catchAsync(async (req: Request, res: Response) => {
  const {
    accountabilityId
  } = pick(req.params, ['accountabilityId']);
  const { segmentId, ...others } = req.body;
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await accountabilityService.updateById(accountabilityId, {
    ...others,
    "work.segmentId": segmentId,
    $unset: {
      "work.workIds": 1,
    },
  });
  res.send(data)
});

const addWork = catchAsync(async (req: Request, res: Response) => {
  const {
    accountabilityId, workInSegmentId
  } = pick(req.params, ['accountabilityId', 'workInSegmentId']);
  const data = await accountabilityService.updateById(accountabilityId, {
    ...req.body,
    ...{
      $addToSet: {
        "work.workIds": workInSegmentId
      }
    }
  });
  res.send(data)
});

const removeWork = catchAsync(async (req: Request, res: Response) => {
  const {
    accountabilityId, workInSegmentId
  } = pick(req.params, ['accountabilityId', 'workInSegmentId']);
  const data = await accountabilityService.updateById(accountabilityId, {
    ...req.body,
    ...{
      $pull: {
        "work.workIds": workInSegmentId
      }
    }
  });
  res.send(data)
});

export const accountabilityController = {
  getList,
  create,
  update,
  dedete,
  getAll,

  addMandate,
  removeMandate,
  updateValueChain,
  updateBusinessProcess,
  updateSegment,
  addWork,
  removeWork,
}
