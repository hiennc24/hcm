import validate from '../../middlewares/validate';

import express from 'express'
import { RequestParams } from '../../types';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { unitBscValidations } from '../../validations/unitBsc.validation';
import { unitBscController } from '../../controllers/unitBsc.controller';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    validate(unitBscValidations.getListUnitByBscType),
    unitBscController.getListUnitByBscType
  )
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(unitBscValidations.createUnit),
    unitBscController.createUnit
  )
router
  .route('/detail/:unitId')
  .get(
    validate(unitBscValidations.getUnitById),
    unitBscController.getUnitById
  )


export const unitBscRoute = router;
