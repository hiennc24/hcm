import validate from '../../middlewares/validate';
import express from 'express'
import { baseUnitController } from '../../controllers';
import { baseUnitValidations } from '../../validations';
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
    validate(baseUnitValidations.create),
    baseUnitController.create
  )
  .get(
    validate(baseUnitValidations.getAll),
    convertSearchFilter("name"),
    baseUnitController.getAll
  )

router
  .route('/:baseUnitId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(baseUnitValidations.update),
    baseUnitController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(baseUnitValidations.deleteOne),
    baseUnitController.dedeteOne
  )
  .get(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(baseUnitValidations.getAll),
    convertSearchFilter("name"),
    baseUnitController.getdetail
  )
// thêm get detail từng sp
export const baseUnitRoute = router;
