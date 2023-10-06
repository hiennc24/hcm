import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { businessCategoryService } from '../services';
import { pick } from '../utils/pick';

const getList = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['search']);
  const options = pick(req.query, ['limit', 'page']);
  const data = await businessCategoryService.getList(filter, options);
  res.send(data)
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['search']);
  const data = await businessCategoryService.getAll(filter);
  res.send(data)
});

export const businessCategoryController = {
  getList,
  getAll,
}
