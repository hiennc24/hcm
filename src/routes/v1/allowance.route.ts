import validate from '../../middlewares/validate';

import express from 'express'
import { allowanceController } from '../../controllers';
import { allowanceValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(allowanceValidations.create),
    allowanceController.create
  )
  .get(
    validate(allowanceValidations.getList),
    allowanceController.getList
  )

router
  .route('/:allowanceId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(allowanceValidations.update),
    allowanceController.update
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(allowanceValidations.deleteAllowance),
    allowanceController.deleteAllowance
  )

export const allowanceRoute = router;
