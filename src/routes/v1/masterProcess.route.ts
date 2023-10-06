import validate from '../../middlewares/validate';

import express from 'express'
import { masterProcessController } from '../../controllers';
import { masterProcessValidations } from '../../validations';
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
    validate(masterProcessValidations.create),
    masterProcessController.create
  )

router
  .route('/get-tree')
  .get(
    // validate(masterProcessValidations.create),
    masterProcessController.getTree
  )

router
  .route('/:masterProcessId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(masterProcessValidations.update),
    masterProcessController.update
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(masterProcessValidations.dedete),
    masterProcessController.dedete
  )

export const masterProcessRoute = router;
