import validate from '../../middlewares/validate';

import express from 'express'
import { rcpController } from '../../controllers';
import { rcpValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { rcpSplitUpValidations } from '../../validations/rcpSplitUp.validation';
import { rcpSplitUpController } from '../../controllers/rcpSplitUp.controller';
// import { rcpByStageRoute } from './rcpByStage.route';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(rcpValidations.create),
    rcpController.create
  )
  .get(
    validate(rcpValidations.getList),
    rcpController.getList
  )

router
  .route('/:rcpId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(rcpValidations.update),
    rcpController.update
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(rcpValidations.deleteItem),
    rcpController.deleteItem
  )

const rcpSplitUpRoute = express.Router({ mergeParams: true });
rcpSplitUpRoute
  .route('/')
  .get(
    validate(rcpSplitUpValidations.getAll),
    rcpSplitUpController.getAll
  )
rcpSplitUpRoute
  .route('/:splitUpTarget')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(rcpSplitUpValidations.create),
    rcpSplitUpController.create
  )
router.use(
  '/:rcpId/:splitUpKey',
  rcpSplitUpRoute
);

export const rcpRoute = router;
