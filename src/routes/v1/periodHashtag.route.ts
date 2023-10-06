import validate from '../../middlewares/validate';

import express from 'express'
import { RequestParams } from '../../types';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { classifyBscValidations } from '../../validations/classifyBsc.validation';
import { classifyBscController } from '../../controllers/classify.controller';
import { periodBscValidations } from '../../validations/periodBsc.validation';
import { periodBscController } from '../../controllers/periodBsc.controller';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    validate(periodBscValidations.getListPeriodByBscType),
    periodBscController.getListPeriodByBscType
  )
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(periodBscValidations.createPeriod),
    periodBscController.createPeriod
  )

// router
//   .route('/list')
//   .get(
//     classifyBscController.getListHashTag
//   )

router
  .route('/detail/:periodId')
  .get(
    validate(periodBscValidations.getPeriodById),
    periodBscController.getPeriodById
  )


export const periodBscRoute = router;
