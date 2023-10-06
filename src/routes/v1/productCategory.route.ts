import validate from '../../middlewares/validate';
import express from 'express'
import { productCategoryController } from '../../controllers';
import { productCategoryValidations } from '../../validations';
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
    validate(productCategoryValidations.create),
    productCategoryController.create
  )
  .get(
    validate(productCategoryValidations.getAll),
    convertSearchFilter("name"),
    productCategoryController.getAll
  )

router
  .route('/:productCategoryId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(productCategoryValidations.update),
    productCategoryController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(productCategoryValidations.deleteOne),
    productCategoryController.dedeteOne
  )
  .get(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(productCategoryValidations.getAll),
    convertSearchFilter("name"),
    productCategoryController.getdetail
  )
// thêm get detail từng sp
router
  .route('/delete-many')
  .post(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(productCategoryValidations.deleteMany),
    productCategoryController.deleteMany
  )
router
  .route('/block-many')
  .post(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(productCategoryValidations.updateMany),
    productCategoryController.updateMany
  )
export const productCategoryRoute = router;
