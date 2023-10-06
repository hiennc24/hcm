import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';
import { palnSaleService } from '../services';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const data = await palnSaleService.create( body);
    res.send(data)

});
const getAll = catchAsync(async (req: Request, res: Response) => {

    const data = await palnSaleService.getAll();
    res.send(data)
  });

const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await palnSaleService.updateOne(req.params.planSaleId, req.body);
    if (!data) {
        return next(new ApiError(httpStatus.NOT_FOUND, 'plan_sale.not_found'));
    }
    res.send(data)
});

const dedeteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await palnSaleService.updateOne(req.params.planSaleId, req.body);
    if (!data) {
        return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    }
    res.status(httpStatus.NO_CONTENT).send()
});

const getdetail = catchAsync(async (req: Request, res: Response) => {
    const data = await palnSaleService.getById(req.params.planSaleId);
    res.send(data)
  });

export const planSaleController = {
    create,
    updateOne,
    dedeteOne,
    getdetail,
    getAll
}
