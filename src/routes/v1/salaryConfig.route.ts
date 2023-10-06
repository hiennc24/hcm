import validate from '../../middlewares/validate';

import express from 'express'
import { salaryConfigController } from '../../controllers';
import { salaryConfigValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { salaryConfigMid } from '../../middlewares/salaryConfigMid';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(salaryConfigValidations.createConfig),
    salaryConfigController.createConfig
  )
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(salaryConfigValidations.updateConfig),
    salaryConfigController.updateConfig
  )
  .get(
    salaryConfigMid,
    salaryConfigController.getSalaryConfig
  )

export const salaryConfigRoute = router;
