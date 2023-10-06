import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { businessSectorService } from '../services';
import { pick } from '../utils/pick';

const getList = catchAsync(async (req: Request, res: Response) => {
  const { search } = pick(req.query, ['search']);
  const options = pick(req.query, ['limit', 'page']);
  const data = await businessSectorService.getList({
    businessCategoryId: req.params.businessCategoryId,
    search
  }, options);
  res.send(data)
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const { search } = pick(req.query, ['search']);
  const data = await businessSectorService.getAll({
    businessCategoryId: req.params.businessCategoryId,
    search
  });
  res.send(data)
});

export const businessSectorController = {
  getList,
  getAll,
}
