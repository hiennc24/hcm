import validate from '../../middlewares/validate';
import express from 'express'
import { customCategoryController } from '../../controllers';
import { customCategoryValidations } from '../../validations';
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
    validate(customCategoryValidations.create),
    customCategoryController.create
  )
  .get(
    validate(customCategoryValidations.getAll),
    convertSearchFilter("name"),
    customCategoryController.getAll
  )

router
  .route('/:customCategoryId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(customCategoryValidations.update),
    customCategoryController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(customCategoryValidations.deleteOne),
    customCategoryController.dedeteOne
  )
  .get(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(customCategoryValidations.getAll),
    convertSearchFilter("name"),
    customCategoryController.getdetail
  )
// thêm get detail từng sp

router
  .route('/delete-many')
  .post(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(customCategoryValidations.deleteMany),
    customCategoryController.deleteMany
  )
router
  .route('/block-many')
  .post(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(customCategoryValidations.updateMany),
    customCategoryController.updateMany
  )
export const customCategoryRoute = router;
