import validate from '../../middlewares/validate';
import express from 'express'
import { objectUserController } from '../../controllers';
import { objectUserValidations } from '../../validations';
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
    validate(objectUserValidations.create),
    objectUserController.create
  )
  .get(
    validate(objectUserValidations.getAll),
    convertSearchFilter("name"),
    objectUserController.getAll
  )

router
  .route('/:objectUserId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(objectUserValidations.update),
    objectUserController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(objectUserValidations.deleteOne),
    objectUserController.dedeteOne
  )
  .get(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(objectUserValidations.getAll),
    convertSearchFilter("name"),
    objectUserController.getdetail
  )
// thêm get detail từng sp
export const objectUserRoute = router;
