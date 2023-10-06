import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { businessProcessService } from '../services';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { pick } from '../utils/pick';

const create = catchAsync(async (req: Request, res: Response) => {
  const processCount = await businessProcessService.getCount(req.params.valueChainId)

  const businessProcess = await businessProcessService.createBusinessProcess({
    position: processCount,
    ...req.body
  });
  res.send(businessProcess)
});

const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await businessProcessService.updateById(
    req.params.businessProcessId, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});

const getList = catchAsync(async (req: Request, res: Response) => {
  const data = await businessProcessService.getList({
    valueChainId: req.params.valueChainId
  });
  res.send(data)
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const data = await businessProcessService.getAll({
    valueChainId: req.params.valueChainId
  });
  res.send(data)
});

const dedete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await businessProcessService.updateById(
    req.params.businessProcessId, req.body,
  );
  await businessProcessService.reSortList(req.params.valueChainId);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});

const drag = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { businessProcessId, valueChainId } = req.params;
  const { after } = req.body;

  if (!businessProcessId == after) {
    res.status(httpStatus.NO_CONTENT).send();
  } else {
    // eslint-disable-next-line prefer-const
    let oldList: any[] = await businessProcessService.getAll({
      valueChainId
    });
    const oldIndex = oldList.findIndex((g: any) => g.id == businessProcessId)
    const afterIndex = oldList.findIndex((g: any) => g.id == after)
    if (oldIndex == -1) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    } else {
      oldList
        .splice(afterIndex + 1, 0, { id: businessProcessId, isNew: true })
      Promise.all(
        oldList.filter((g: any) => (g.id != businessProcessId || !!g.isNew)) //khác vị trí cũ
          .map((g, index) => {
            return businessProcessService.updateById(g.id, {
              position: index
            })
          })
      )
        .then(() => {
          res.status(httpStatus.NO_CONTENT).send();
        })
    }
  }
});

export const businessProcessController = {
  getList,
  create,
  update,
  drag,
  dedete,
  getAll,
}
