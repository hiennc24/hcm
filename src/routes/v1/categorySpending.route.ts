import validate from '../../middlewares/validate';
import express from 'express'
import { categorySpendingController } from '../../controllers';
import { categorySpendingValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { convertSearchFilter } from '../../middlewares/convertSearchFilter';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(categorySpendingValidations.create),
    categorySpendingController.create
  )
  .get(
    validate(categorySpendingValidations.getAll),
    convertSearchFilter("name"),
    categorySpendingController.getAll
  )

router
  .route('/:categorySpendingId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(categorySpendingValidations.update),
    categorySpendingController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(categorySpendingValidations.deleteOne),
    categorySpendingController.dedeteOne
  )
  .get(
    validate(categorySpendingValidations.getdetail),
    categorySpendingController.getdetail
  )

router
  .route('/delete-many')
  .post(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(categorySpendingValidations.deleteMany),
    categorySpendingController.deleteMany
  )
router
  .route('/block-many')
  .post(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(categorySpendingValidations.updateMany),
    categorySpendingController.updateMany
  )
export const categorySpendingRoute = router;
