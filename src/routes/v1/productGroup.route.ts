import validate from '../../middlewares/validate';

import express from 'express'
import { productGroupController } from '../../controllers';
import { productGroupValidations } from '../../validations';
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
    validate(productGroupValidations.create),
    productGroupController.create
  )
  .get(
    validate(productGroupValidations.getAll),
    convertSearchFilter("name"),
    productGroupController.getAll
  )

router
  .route('/:productGroupId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(productGroupValidations.update),
    productGroupController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(productGroupValidations.deleteOne),
    productGroupController.dedeteOne
  )
  .get(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(productGroupValidations.getAll),
    convertSearchFilter("name"),
    productGroupController.getdetail
  )
router
  .route('/delete-many')
  .post(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(productGroupValidations.deleteMany),
    productGroupController.deleteMany
  )
  router
  .route('/block-many')
  .post(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(productGroupValidations.updateMany),
    productGroupController.updateMany
  )

export const productGroupRoute = router;
