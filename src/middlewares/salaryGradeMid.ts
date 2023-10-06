import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { salaryGradeService } from '../services';
import ApiError from '../utils/ApiError';

export async function salaryGradeMid(req: Request, res: Response, next: any) {
  const { salaryGradeId } = req.params;

  const salaryGrade = await salaryGradeService.getOne({
    _id: salaryGradeId,
    salaryConfigId: req.salaryConfigId
  })
  if (!salaryGrade) return next(new ApiError(httpStatus.BAD_REQUEST, "salary_grade.not_found"));

  req.salaryGrade = salaryGrade;
  next()
}
