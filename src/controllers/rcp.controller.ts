import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { rcpService } from '../services/rcp.service';
import { RCP_TYPES } from '../types';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

// FM01-2
const create = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line prefer-const
  let { year, itemType, parentId, ...others } = req.body;

  if (!!parentId) {
    const parent = await rcpService.getById(parentId)
    if (!!parent) {
      year = parent.year;
      itemType = parent.itemType;
    }
  }

  // const position = await rcpService.getCount({
  //   year, itemType
  // })
  const data = await rcpService.create({ year, itemType, parentId, ...others });
  res.send(data)
});

const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await rcpService.updateById(req.params.rcpId, req.body);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'rcp.not_found'));
  }
  res.send(data)
});

const deleteItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await rcpService.deleteById(req.params.rcpId, req.body.deletedById);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'rcp.not_found'));
  }
  res.send(data)
});

const getList = catchAsync(async (req: Request, res: Response) => {
  const grades: any[] = await Promise.all([
    rcpService.getAllListRCP({
      itemType: RCP_TYPES.NET_REVENUE,
      companyId: req.companyId,
      parentId: { $exists: false }
    }),
    rcpService.getAllListRCP({
      itemType: RCP_TYPES.COST_OF_CAPITAL,
      companyId: req.companyId,
      parentId: { $exists: false }
    }),
    rcpService.getAllListRCP({
      itemType: RCP_TYPES.COST_OF_FINANCIAL,
      companyId: req.companyId,
      parentId: { $exists: false }
    }),
    rcpService.getAllListRCP({
      itemType: RCP_TYPES.SALES_EXPENSES,
      companyId: req.companyId,
      parentId: { $exists: false }
    }),
    rcpService.getAllListRCP({
      itemType: RCP_TYPES.ADMINISTRATIVE_EXPENSES,
      companyId: req.companyId,
      parentId: { $exists: false }
    }),
  ]);

  res.send([
    {
      name: "Doanh thu thuần",
      childrens: grades[0]
    },
    {
      name: "Giá vốn",
      childrens: grades[1]
    },
    {
      name: "Chi phí tài chính",
      childrens: grades[2]
    },
    {
      name: "Chi phí bán hàng",
      childrens: grades[3]
    },
    {
      name: "Chi phí quản lý doanh nghiệp",
      childrens: grades[4]
    },
  ]);
});

export const rcpController = {
  create,
  update,
  deleteItem,
  getList
}
