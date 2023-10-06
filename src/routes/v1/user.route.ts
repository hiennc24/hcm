import validate from '../../middlewares/validate';

import express from 'express'
import { userController } from '../../controllers';
import { userValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    userController.getList
  )

router
  .route('/:userId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(userValidations.update),
    userController.update
  )
  .get(
    userController.getList
  )

export const userRoute = router;
