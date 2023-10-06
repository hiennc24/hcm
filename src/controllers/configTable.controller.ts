import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { configTableService } from '../services';
import ApiError from '../utils/ApiError';
import { catchAsync } from '../utils/catchAsync';

const get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await configTableService.get(req.params.tableKey, req.companyId)
    if (!data) {
        return next(new ApiError(httpStatus.NOT_FOUND, 'Table Not found'));
    }
    res.send(data);
});

const post = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const companyId = req.companyId;
    const data = await configTableService.post(req.params.tableKey, req.body, userId, companyId)
    if (!data) {
        return next(new ApiError(httpStatus.NOT_FOUND, 'Table Not found'));
    }
    res.send(data);
});

const edit = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await configTableService.edit(req.companyId, req.params.tableKey, req.params.columKey, req.body)
    if (!data) {
        return next(new ApiError(httpStatus.NOT_FOUND, 'Table Not found'));
    }
    res.send(data);
});



export const configTableController = {
    get,
    post,
    edit,
}
