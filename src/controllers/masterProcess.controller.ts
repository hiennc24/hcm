import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { masterProcessService } from '../services/masterProcess.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { personnelPositionService } from '../services';
import { PROCESS_TYPES } from '../types';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line prefer-const
  let { parentId } = req.body;
  let processType = PROCESS_TYPES.MPROJECT;
  if (!!parentId) {
    const parent = await masterProcessService.getById(parentId)
    if (!parent) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Parent Not found'));
    }

    const { processType: pProcessType } = parent;

    if (pProcessType == PROCESS_TYPES.MTASK) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Parent Invalid'));
    }

    if (pProcessType == PROCESS_TYPES.MPROJECT) {
      processType = PROCESS_TYPES.MPHASE;
    } else if (pProcessType == PROCESS_TYPES.MPHASE) {
      processType = PROCESS_TYPES.MTASK;
    }
  }

  const data = await masterProcessService.create({
    ...req.body,
    processType
  });
  res.send(data)
});

const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { personnelPositionId, departmentId } = req.body;

  console.log("req.params.masterProcessId", req.params.masterProcessId)
  const mP = await masterProcessService.getById(req.params.masterProcessId)
  console.log("update masterProcessId", 1)
  if (!mP) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'master_process.not_found'));
  }

  const targetDepartmentId = departmentId || mP.departmentId;
  if (!!personnelPositionId) {

    // nêú có personnelPositionId mà k có targetDepartmentId thì lỗi.
    if (!targetDepartmentId) return next(new ApiError(httpStatus.BAD_REQUEST, 'master_process.body_invalid'));

    const checkPositionInDep = await personnelPositionService.checkPersonnelInDepartment(personnelPositionId, targetDepartmentId)
    // const department = await personnelPositionService.getPersonnelIdsInDepartment(targetDepartmentId)

    if (!checkPositionInDep) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'master_process.personnel_position_notin_department'));
    }

    const data = await masterProcessService.updateById(
      req.params.masterProcessId,
      {
        ...req.body,
        departmentId: targetDepartmentId,
        personnelPositionId
      }
    )
    return res.send(data)
  }

  const data = await masterProcessService.updateById(req.params.masterProcessId, req.body)
  return res.send(data)
});

const dedete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { deletedById } = req.body;
  const data = await masterProcessService.updateById(req.params.masterProcessId, {
    deletedById,
    deletedAt: new Date()
  })
  if (!data) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'master_process.not_found'));
  }
  return res.status(httpStatus.NO_CONTENT).send()
});

const getTree = catchAsync(async (req: Request, res: Response) => {
  const data = await masterProcessService.getTree()
  return res.send(data)
});

export const masterProcessController = {
  create,
  update,
  dedete,
  getTree
}
