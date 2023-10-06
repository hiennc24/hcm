import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { BSC_ENTIRY_ON_MODEL } from '../types';
import { rcpSplitUpService } from '../services/rcpSplitUp.service';
import { pick } from '../utils/pick';
import { TABLE_HASHTAG_BSC } from '../config/table';

// FM01-2
const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { rcpId, splitUpKey, splitUpTarget } = req.params;
  // eslint-disable-next-line prefer-const
  let { value, ...body } = req.body;

  if (splitUpKey == BSC_ENTIRY_ON_MODEL.TABLE_DIVERGENCE) {
    body.splitByMonth = splitUpTarget;
  } else if (
    splitUpKey == BSC_ENTIRY_ON_MODEL.TABLE_STORE
    || splitUpKey == BSC_ENTIRY_ON_MODEL.TABLE_STAFF
    || splitUpKey == BSC_ENTIRY_ON_MODEL.TABLE_PROJECT_CONTRACT
    || splitUpKey == BSC_ENTIRY_ON_MODEL.TABLE_FUNCTION
  ) {
    body.splitUpModel = TABLE_HASHTAG_BSC;
    body.splitUpId = splitUpTarget
  } else {
    body.splitUpModel = splitUpKey;
    body.splitUpId = splitUpTarget
  }

  try {
    const data = await rcpSplitUpService.createOrUpdate({
      rcpId, splitUpKey,
      ...body
    }, {
      value,
    });

    res.send(data)
  } catch (error: any) {
    console.log("error.message", error.message)
    next(error.message)
  }
});

// const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const data = await rcpSplitUpService.updateById(req.params.rcpSplitUpId, req.body);
//   if (!data) {
//     return next(new ApiError(httpStatus.NOT_FOUND, 'rcpSplitUp.not_found'));
//   }
//   res.send(data)
// });

// const deleteItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const data = await rcpSplitUpService.deleteById(req.params.rcpSplitUpId, req.body.deletedById);
//   if (!data) {
//     return next(new ApiError(httpStatus.NOT_FOUND, 'rcpSplitUp.not_found'));
//   }
//   res.send(data)
// });

// const getList = catchAsync(async (req: Request, res: Response) => {
//   const grades: any[] = await Promise.all([
//     rcpSplitUpService.getAllListRCP({
//       itemType: RCP_TYPES.NET_REVENUE,
//       companyId: req.companyId,
//       parentId: { $exists: false }
//     }),
//     rcpSplitUpService.getAllListRCP({
//       itemType: RCP_TYPES.COST_OF_CAPITAL,
//       companyId: req.companyId,
//       parentId: { $exists: false }
//     }),
//     rcpSplitUpService.getAllListRCP({
//       itemType: RCP_TYPES.COST_OF_FINANCIAL,
//       companyId: req.companyId,
//       parentId: { $exists: false }
//     }),
//     rcpSplitUpService.getAllListRCP({
//       itemType: RCP_TYPES.SALES_EXPENSES,
//       companyId: req.companyId,
//       parentId: { $exists: false }
//     }),
//     rcpSplitUpService.getAllListRCP({
//       itemType: RCP_TYPES.ADMINISTRATIVE_EXPENSES,
//       companyId: req.companyId,
//       parentId: { $exists: false }
//     }),
//   ]);

//   res.send([
//     {
//       name: "Doanh thu thuần",
//       childrens: grades[0]
//     },
//     {
//       name: "Giá vốn",
//       childrens: grades[1]
//     },
//     {
//       name: "Chi phí tài chính",
//       childrens: grades[2]
//     },
//     {
//       name: "Chi phí bán hàng",
//       childrens: grades[3]
//     },
//     {
//       name: "Chi phí quản lý doanh nghiệp",
//       childrens: grades[4]
//     },
//   ]);
// });

const getAll = catchAsync(async (req: Request, res: Response) => {
  const { rcpId, splitUpKey } = pick(req.params, ['rcpId', 'splitUpKey']);
  const data = await rcpSplitUpService.getAll({ rcpId, splitUpKey });
  res.send(data)
});

export const rcpSplitUpController = {
  create,
  getAll
  // update,
  // deleteItem,
}
