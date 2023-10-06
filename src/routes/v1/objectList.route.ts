import validate from '../../middlewares/validate';
import express from 'express'
import { objectListController } from '../../controllers';
import { objectListValidations } from '../../validations';
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
    validate(objectListValidations.create),
    objectListController.create
  )
  .get(
    validate(objectListValidations.getAll),
    convertSearchFilter("name"),
    objectListController.getAll
  )

router
  .route('/:objectListId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(objectListValidations.update),
    objectListController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(objectListValidations.deleteOne),
    objectListController.dedeteOne
  )
  .get(
    validate(objectListValidations.getAll),
    convertSearchFilter("name"),
    objectListController.getdetail
  )
// thêm get detail từng sp
router
  .route('/delete-many')
  .post(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(objectListValidations.deleteMany),
    objectListController.deleteMany
  )
router
  .route('/block-many')
  .post(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(objectListValidations.updateMany),
    objectListController.updateMany
  )
export const objectListRoute = router;
