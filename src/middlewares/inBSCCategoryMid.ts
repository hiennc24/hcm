import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { businessCategoryService, businessProcessService, valueChainService } from '../services';
import ApiError from '../utils/ApiError';

export async function inBSCCategoryMid(req: Request, res: Response, next: any) {
    // const data = await businessCategoryService.getOne({
    //     _id: req.params.categoryId,
    // })
    // if (!data) return next(new ApiError(httpStatus.BAD_REQUEST, "bsc_category.not_found"));
    // req.bscCategory = data;
    next()
}
