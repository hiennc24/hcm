import validate from '../../middlewares/validate';

import express from 'express'
import { personnelPositionController } from '../../controllers';
import { personnelPositionValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { departmentMid } from '../../middlewares/departmentMid';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(personnelPositionValidations.create),
    departmentMid,
    personnelPositionController.create
  )
  .get(
    validate(personnelPositionValidations.getList),
    personnelPositionController.getList
  )
  router
  .route('/all')
  .get(
    validate(personnelPositionValidations.getList),
    personnelPositionController.getAll
  )
router
  .route('/:personnelPositionId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(personnelPositionValidations.update),
    personnelPositionController.update
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(personnelPositionValidations.dedete),
    personnelPositionController.update
  )

export const personnelPositionRoute = router;
