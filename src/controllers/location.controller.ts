import { NextFunction, Request, Response } from 'express';
import { locationService } from '../services';
import { catchAsync } from '../utils/catchAsync';

const getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { search, type, parent } = req.query;
  const list = await locationService.getAll({ search, type, parent })
  res.send(list);
});

// location
export const locationController = {
  getAll,
}
