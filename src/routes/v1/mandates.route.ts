import express from 'express'
// import { addDataToBody, addParamToBody } from '../../middlewares/addUserToBody';
// import { RequestParams } from '../../types';
import { mandatesController } from '../../controllers/mandates.controller';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  // .post(
  //   addDataToBody({
  //     createdById: RequestParams.USERID,
  //     companyId: RequestParams.COMPANYID,
  //   }),
  //   validate(mandatesValidations.create),
  //   mandatesController.create
  // )
  .get(
    mandatesController.getAll
  )

router
  .route('/:mandatesId')
  // .patch(
  //   addDataToBody({
  //     updatedById: RequestParams.USERID,
  //   }),
  //   validate(mandatesValidations.update),
  //   addParamToBody(["mandatesId"]),
  //   mandatesController.update
  // )

export const mandatesRoute = router;
