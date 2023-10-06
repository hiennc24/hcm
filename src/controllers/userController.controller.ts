import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { userService } from '../services';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { UserModel } from '../models';
import { pick } from '../utils/pick';

const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await userService.updateUser(req.params.userId, req.body);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'user.not_found'));
  }
  res.send(data)
});

const getList = catchAsync(async (req: Request, res: Response) => {
  // const filter = pick(req.query, ['departmentId', 'personnelPositionId', 'createdById']);
  const options = pick(req.query, ['limit', 'page']);
  const data = await userService.getList({
    companyId: req.companyId
  }, options);
  res.send(data)
});

export const userController = {
  getList,
  update,
}
