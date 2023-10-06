import validate from '../../middlewares/validate';

import express from 'express'
import { accountabilityController } from '../../controllers';
import { accountabilityValidations } from '../../validations';
import { addDataToBody, addParamToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { accountSegmentRoute } from './accountSegment.route';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    addParamToBody(["dutyId"]),
    validate(accountabilityValidations.create),
    accountabilityController.create
  )
  .get(
    validate(accountabilityValidations.getList),
    accountabilityController.getList
  )

router
  .route('/all')
  .get(
    validate(accountabilityValidations.getAll),
    accountabilityController.getAll
  )

router
  .route('/:accountabilityId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(accountabilityValidations.update),
    accountabilityController.update
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(accountabilityValidations.dedete),
    accountabilityController.update
  )

const mandatesRoute = express.Router({ mergeParams: true });
mandatesRoute
  .route('/:personnelPositionId')
  .post(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(accountabilityValidations.updateMandate),
    accountabilityController.addMandate
  )
  .delete(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(accountabilityValidations.updateMandate),
    accountabilityController.removeMandate
  )

const worksRoute = express.Router({ mergeParams: true });
worksRoute
  .route('/valuechain')
  .put(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(accountabilityValidations.updateValueChain),
    accountabilityController.updateValueChain
  )
worksRoute
  .route('/business-process')
  .put(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(accountabilityValidations.updateBusinessProcess),
    accountabilityController.updateBusinessProcess
  )
worksRoute
  .route('/segment')
  .put(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(accountabilityValidations.updateSegment),
    accountabilityController.updateSegment
  )
worksRoute
  .route('/works/:workInSegmentId')
  .post(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(accountabilityValidations.addWork),
    accountabilityController.addWork
  )
  .delete(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(accountabilityValidations.addWork),
    accountabilityController.removeWork
  )

router
  .use('/:accountabilityId/mandates', mandatesRoute)
router
  .use('/:accountabilityId/config-works', worksRoute)
router
  .use('/:accountabilityId/account-segment', accountSegmentRoute)

export const accountabilityRoute = router;
