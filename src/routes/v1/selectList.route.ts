import validate from '../../middlewares/validate';
import express from 'express'
import { selectListController } from '../../controllers';
import { selectListValidations } from '../../validations';
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
    validate(selectListValidations.create),
    selectListController.create
  )
  .get(
    validate(selectListValidations.getAll),
    convertSearchFilter("name"),
    selectListController.getAll
  )

router
  .route('/:selectListId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(selectListValidations.update),
    selectListController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(selectListValidations.deleteOne),
    selectListController.dedeteOne
  )
export const selectListRoute = router;
