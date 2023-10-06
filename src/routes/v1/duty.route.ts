import validate from '../../middlewares/validate';

import express from 'express'
import { dutyController } from '../../controllers';
import { dutyValidations } from '../../validations';
import { addDataToBody, addParamToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { accountabilityRoute } from './accountability.route';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(dutyValidations.create),
    dutyController.create
  )
  .get(
    validate(dutyValidations.getList),
    dutyController.getList
  )

router
  .route('/:dutyId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(dutyValidations.update),
    addParamToBody(["dutyId"]),
    dutyController.update
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(dutyValidations.dedete),
    dutyController.dedete
  )

router
  .use('/:dutyId/accountability', accountabilityRoute)

export const dutyRoute = router;
