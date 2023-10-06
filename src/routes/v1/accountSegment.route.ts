import { accountSegmentValidations } from '../../validations/accounSegment.validation';
import validate from '../../middlewares/validate';

import express from 'express'
import { addDataToBody, addParamToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { accountSegmentController } from '../../controllers/accountSegment.controller';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    addParamToBody(["accountabilityId"]),
    validate(accountSegmentValidations.create),
    accountSegmentController.create
  )
  .get(
    accountSegmentController.getInfo
  )
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(accountSegmentValidations.update),
    accountSegmentController.update
  )

export const accountSegmentRoute = router;
