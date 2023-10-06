import validate from '../../middlewares/validate';
import express from 'express'
import { salePlanDetailController } from '../../controllers';
import { salePlanDetailValidations } from '../../validations';
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
    validate(salePlanDetailValidations.create),
    salePlanDetailController.create
  )
  // .get(
  //   // validate(salePlanDetailValidations.getAll),
  //   salePlanDetailController.getAll
  // )

router
  .route('/all')
  .get(
    // validate(salePlanDetailValidations.getAll),
    salePlanDetailController.getAll
  )

router
  .route('/:salePlanDetailId')
  // .patch(
  //   addDataToBody({
  //     updatedById: RequestParams.USERID,
  //   }),
  //   validate(salePlanDetailValidations.updateOne),
  //   salePlanDetailController.updateOne
  // )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(salePlanDetailValidations.deleteOne),
    salePlanDetailController.dedeteOne
  )
  .get(
    validate(salePlanDetailValidations.getdetail),
    salePlanDetailController.getdetail
  )


export const salePlanDetailRoute = router;
