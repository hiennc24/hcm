import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { salaryGradeService } from '../services';
import ApiError from '../utils/ApiError';

export const convertSearchFilter = (keySearch: string) => (req: Request, res: Response, next: any) => {
  console.log("addParamToBody")
  const { search } = req.query;
  req.query.searchJson = !!search
    ? JSON.stringify({
      [keySearch]: { $regex: search }
    })
    : "{}";
  delete (req.query.search)
  next()
}
