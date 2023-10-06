import validate from '../../middlewares/validate';

import express from 'express'
import { segmentController } from '../../controllers';
import { segmentValidations } from '../../validations';
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
    validate(segmentValidations.create),
    segmentController.create
  )
  .get(
    validate(segmentValidations.getAll),
    segmentController.getAll
  )

router
  .route('/:segmentId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(segmentValidations.updateById),
    segmentController.updateById
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(segmentValidations.dedeteById),
    segmentController.dedeteById
  )

router
  .route('/:segmentId/drag')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(segmentValidations.drag),
    segmentController.drag
  )
export const segmentRoute = router;
