import express from 'express'
import { configTableController } from '../../controllers';
import { addDataToBody } from '../../middlewares/addUserToBody';
import validate from '../../middlewares/validate';
import { RequestParams } from '../../types';
import { configsTableValidations } from '../../validations';
const router = express.Router({ mergeParams: true });


router
  .route('/:tableKey')
  .get(
    validate(configsTableValidations.get),
    configTableController.get
  )
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(configsTableValidations.post),
    configTableController.post
  )
router
  .route('/:tableKey/colum/:columKey')
  .post(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(configsTableValidations.edit),
    configTableController.edit
  )

export const cinfigTableRoute = router;
