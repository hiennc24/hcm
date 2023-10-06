import validate from '../../middlewares/validate';
import express from 'express'
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { planSaleValidations } from '../../validations';
import { planSaleController } from '../../controllers';
// import { salePlanDetailRoute } from './salePlanDetail.route';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(planSaleValidations.create),
    planSaleController.create
  )
  .get(
    validate(planSaleValidations.getAll),
    planSaleController.getAll
  )

router
  .route('/:planSaleId')
  // .patch(
  //   addDataToBody({
  //     updatedById: RequestParams.USERID,
  //   }),
  //   validate(planSaleValidations.update),
  //   planSaleController.updateOne
  // )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(planSaleValidations.deleteOne),
    planSaleController.dedeteOne
  )
  .get(
    validate(planSaleValidations.getdetail),
    planSaleController.getdetail
  )

// router
//   .use('/:planSaleId/detail', salePlanDetailRoute)

export const planSaleRoute = router;
