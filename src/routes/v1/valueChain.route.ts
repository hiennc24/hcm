import validate from '../../middlewares/validate';

import express from 'express'
import { valueChainController } from '../../controllers';
import { valueChainValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { businessProcessRoute } from './businessProcess.route';
import { inValueChangeMid } from '../../middlewares/inValueChangeMid';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(valueChainValidations.create),
    valueChainController.create
  )
  .get(
    valueChainController.getList
  )

router
  .route('/:valueChainId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(valueChainValidations.update),
    valueChainController.update
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(valueChainValidations.dedete),
    valueChainController.update
  )

router.use(
  '/:valueChainId/process',
  inValueChangeMid,
  businessProcessRoute
);
export const valueChainRoute = router;
