import validate from '../../middlewares/validate';
import express from 'express'
import { bscDetailController } from '../../controllers';
import { bscDetailValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { convertSearchFilter } from '../../middlewares/convertSearchFilter';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    validate(bscDetailValidations.getAll),
    convertSearchFilter("name"),
    bscDetailController.getAll
  )

router
  .route('/:splitUpTarget')
  .patch(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(bscDetailValidations.create),
    bscDetailController.create
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(bscDetailValidations.deleteOne),
    bscDetailController.dedeteOne
  )
  .get(
    validate(bscDetailValidations.getdetail),
    bscDetailController.getdetail
  )

export const bscDetailRoute = router;
