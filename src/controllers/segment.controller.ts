import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { segmentService } from '../services/segment.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response) => {
  const { after, ...others } = req.body;
  const allSegment = await segmentService.getAll({
    businessProcessId: req.params.businessProcessId
  })
  const afterSegment = allSegment.find(s => s.id == after)

  const position = !!afterSegment ? afterSegment.position + 1 : 0;
  const [newSegment] = await Promise.all([
    segmentService.create({
      position: !!afterSegment ? afterSegment.position + 1 : 0,
      businessProcessId: req.params.businessProcessId,
      valueChainId: req.params.valueChainId,
      ...others
    }),
    Promise.all([allSegment.map(s => {
      if (s.position < position) return Promise.resolve()

      return segmentService.updateById(s.id, {
        position: s.position + 1
      })
    })])
  ])

  // const data = await segmentService.create(req.body);
  res.send(newSegment)
});

const updateById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await segmentService.updateById(
    req.params.segmentId, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});

const drag = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { segmentId, businessProcessId } = req.params;
  const { after } = req.body;
  if (!segmentId == after) {
    res.status(httpStatus.NO_CONTENT).send();
  } else {
    // eslint-disable-next-line prefer-const
    let oldList: any[] = await segmentService.getAll({
      businessProcessId
    });
    const oldIndex = oldList.findIndex((g: any) => g.id == segmentId)
    const afterIndex = oldList.findIndex((g: any) => g.id == after)
    if (oldIndex == -1) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    } else {
      oldList
        .splice(afterIndex + 1, 0, { id: segmentId, isNew: true })
      // res.send(oldList);
      Promise.all(
        oldList.filter((g: any) => (g.id != segmentId || !!g.isNew)) //khác vị trí cũ
          .map((g, index) => {
            return segmentService.updateById(g.id, {
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

const dedeteById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { segmentId, businessProcessId, valueChainId } = req.params;
  const data = await segmentService.deleteSegment(
    { segmentId, businessProcessId, valueChainId }, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }

  res.status(httpStatus.NO_CONTENT).send()
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  // const filter = pick(req.query, ['departmentId', 'personnelPositionId', 'createdById']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await segmentService.getAll({
    businessProcessId: req.params.businessProcessId
  });
  res.send(data)
});

export const segmentController = {
  create,
  updateById,
  dedeteById,
  drag,
  getAll,
}
