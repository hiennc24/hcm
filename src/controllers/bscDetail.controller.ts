import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { bscDetailService, productGroupService, channelService, baseUnitService } from '../services/index'
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';
import { BSC_ENTIRY_ON_MODEL } from '../types';
import { TABLE_HASHTAG_BSC } from '../config/table';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const { bscCategoryKey, targetId, splitUpKey, splitUpTarget } = req.params;
  // eslint-disable-next-line prefer-const
  let filter: any = {
    bscCategoryKey, targetId, splitUpKey
  }
  if (splitUpKey == BSC_ENTIRY_ON_MODEL.TABLE_DIVERGENCE) {
    filter.splitByMonth = splitUpTarget;
  } else if (
    splitUpKey == BSC_ENTIRY_ON_MODEL.TABLE_STORE
    || splitUpKey == BSC_ENTIRY_ON_MODEL.TABLE_STAFF
    || splitUpKey == BSC_ENTIRY_ON_MODEL.TABLE_PROJECT_CONTRACT
    || splitUpKey == BSC_ENTIRY_ON_MODEL.TABLE_FUNCTION
  ) {
    filter.splitUpModel = TABLE_HASHTAG_BSC;
    filter.splitUpId = splitUpTarget
  } else {
    filter.splitUpModel = splitUpKey;
    filter.splitUpId = splitUpTarget
  }

  try {
    const data = await bscDetailService.createOrUpdate(filter, req.body);

    res.send(data)
  } catch (error: any) {
    console.log("error.message", error.message)
    next(error.message)
  }
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const { bscCategoryKey, targetId, splitUpKey }: any = req.params;
  const data = await bscDetailService.getAll({ bscCategoryKey, targetId, splitUpKey });
  res.send(data)
})

const dedeteOne = catchAsync(async (req: Request, res: Response) => {
  const { bscCategoryKey, targetId, splitUpKey }: any = req.params;
  const data = await bscDetailService.updateOne({
    bscCategoryKey, targetId, splitUpKey
  }, req.body);
  res.send(data);
})

const getdetail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { bscCategoryKey, targetId, splitUpKey }: any = req.params;
  const data = await bscDetailService.getOne({ bscCategoryKey, targetId, splitUpKey });
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'not_found'));
  }
  res.send(data)
});

// const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const body = req.body;
//   // eslint-disable-next-line prefer-const
//   let { newDetailCode, newEntityName, entityId, detailCode, createdById, companyId } = body;
//   const splitUpKey = req.params.splitUpKey;
//   const bscTargetId = req.params.bscTargetId;
//   if (entityId) {
//     if (splitUpKey == "core_product_group") {
//       const Entity = await productGroupService.getById(entityId);
//       if (!Entity) {
//         return next(new ApiError(httpStatus.NOT_FOUND, 'product_category.not_found'));
//       }
//       detailCode = Entity.itemGroupCode;
//     }
//     else if (splitUpKey == "core_channel") {
//       const Entity = await channelService.getById(entityId);
//       if (!Entity) {
//         return next(new ApiError(httpStatus.NOT_FOUND, 'core_channel.not_found'));
//       }
//       detailCode = Entity.channelCode;
//     }
//     else if (splitUpKey == "core_base_unit") {
//       const Entity = await baseUnitService.getById(entityId);
//       if (!Entity) {
//         return next(new ApiError(httpStatus.NOT_FOUND, 'core_base_unit.not_found'));
//       }
//       detailCode = Entity.baseUnitCode;
//     }
//   }
//   if (newDetailCode || newEntityName) {
//     if (splitUpKey == "core_product_group") {
//       const newEntity = await productGroupService.create({ name: newEntityName, itemGroupCode: newDetailCode, companyId, createdById });
//       if (!newEntity) {
//         return next(new ApiError(httpStatus.NOT_FOUND, 'product_category.not_found'));
//       }
//       entityId = newEntity._id;
//       detailCode = newDetailCode;
//     }
//     else if (splitUpKey == "core_channel") {
//       const newEntity = await channelService.create({ name: newEntityName, channelCode: newDetailCode, companyId, createdById });
//       if (!newEntity) {
//         return next(new ApiError(httpStatus.NOT_FOUND, 'core_channel.not_found'));
//       }
//       entityId = newEntity._id;
//       detailCode = newDetailCode;
//     }
//     else if (splitUpKey == "core_base_unit") {
//       const newEntity = await baseUnitService.create({ name: newEntityName, baseUnitCode: newDetailCode, companyId, createdById });
//       if (!newEntity) {
//         return next(new ApiError(httpStatus.NOT_FOUND, 'core_base_unit.not_found'));
//       }
//       entityId = newEntity._id;
//       detailCode = newDetailCode;
//     }
//   }
//   const data = await bscDetailService.updateOne(
//     { _id: req.params.bscDetailId, companyId: req.companyId }, {
//     ...body, detailCode
//   }
//   );
//   if (!data) {
//     return next(new ApiError(httpStatus.NOT_FOUND, 'product_category.not_found'));
//   }
//   res.send(data)
// });

export const bscDetailController = {
  getAll,
  create,
  dedeteOne,
  getdetail,
}
