import validate from '../../middlewares/validate';

import express from 'express'
import { salaryLevelController } from '../../controllers';
import { salaryLevelValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(salaryLevelValidations.createSalaryLevel),
    salaryLevelController.createSalaryLevel
  )
  .get(
    salaryLevelController.getSalaryLevels
  )

router
  .route('/:salaryLevelId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(salaryLevelValidations.updateSalaryLevel),
    salaryLevelController.updateSalaryLevel
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(salaryLevelValidations.deleteSalaryLevel),
    salaryLevelController.deleteSalaryLevel
  )

  router
    .route('/:salaryLevelId/set-base')
    .patch(
      addDataToBody({
        updatedById: RequestParams.USERID,
      }),
      validate(salaryLevelValidations.changeSalaryLevelBase),
      salaryLevelController.changeSalaryLevelBase
    )

export const salaryLevelRouter = router;
