import validate from '../../middlewares/validate';
import express from 'express'
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { bscTargetController } from '../../controllers/bscTarget.controller';
import { bscTargetValidations } from '../../validations/bscTarget.validation';
import { bscDetailRoute } from './bscDetail.route';
import { convertSearchFilter } from '../../middlewares/convertSearchFilter';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(bscTargetValidations.createTarget),
    bscTargetController.createTarget
  )
  .get(
    validate(bscTargetValidations.getTarget),
    convertSearchFilter("name"),
    bscTargetController.getTarget
  )

router
  .route('/:targetId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(bscTargetValidations.updateTarget),
    bscTargetController.updateTarget
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(bscTargetValidations.deleteTarget),
    bscTargetController.deleteTarget
  )
  .get(
    validate(bscTargetValidations.getdetail),
    bscTargetController.getdetail
  )

router.use(
  '/:targetId/split-up/:splitUpKey/detail-bsc',
  // inBSCTargetMid,
  bscDetailRoute
);


export const bscTargetRoute = router;
