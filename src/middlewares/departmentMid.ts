import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { departmentService } from '../services/department.service';
import ApiError from '../utils/ApiError';

export async function departmentMid(req: Request, res: Response, next: any) {
  const department = await departmentService.findById(req.params.departmentId, {
    skipPopulateParent: true, skipPersonnelPositions: true, skipPopulateChildrens: true
  })
  if (!department) return next(new ApiError(httpStatus.BAD_REQUEST, "department.not_found"));
  req.departmentId = department.id;
  next()
}
