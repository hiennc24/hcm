import validate from '../../middlewares/validate';
import express from 'express'
import { bscCategoryValidations } from '../../validations';
import { bscCategoryController } from '../../controllers/bscCategory.controller';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { bscTargetRoute } from './bscTarget.route';
import { inBSCCategoryMid } from '../../middlewares/inBSCCategoryMid';
const router = express.Router({ mergeParams: true });

router
  .route("/")
  // .post(
  //   validate(bscCategoryValidations.createList),
  //   bscCategoryController.createListCategory
  // )
  .get(
    bscCategoryController.getListCategory
  )

router
  .route('/:bscCategoryKey')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(bscCategoryValidations.updateCategory),
    bscCategoryController.updateCategory
  )
  .get(
    validate(bscCategoryValidations.getdetail),
    bscCategoryController.getdetail
  )

router.use(
  '/:bscCategoryKey/target-bsc',
  inBSCCategoryMid,
  bscTargetRoute
);

export const bscCategoryRoute = router;
