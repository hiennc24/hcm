import validate from '../../middlewares/validate';

import express from 'express'
import { businessProcessController } from '../../controllers';
import { businessProcessValidations } from '../../validations';
import { addDataToBody, addParamToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { segmentRoute } from './segment.route';
import { inBusinessProcessMid } from '../../middlewares/inValueChangeMid';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(businessProcessValidations.create),
    addParamToBody(["valueChainId"]),
    businessProcessController.create
  )
  .get(
    validate(businessProcessValidations.getAll),
    businessProcessController.getAll
  )

router
  .route('/:businessProcessId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(businessProcessValidations.update),
    businessProcessController.update
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(businessProcessValidations.dedete),
    businessProcessController.update
  )

router
  .route('/:businessProcessId/drag')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(businessProcessValidations.drag),
    inBusinessProcessMid,
    businessProcessController.drag
  )

router.use(
  '/:businessProcessId/segment',
  inBusinessProcessMid,
  segmentRoute
);

export const businessProcessRoute = router;
