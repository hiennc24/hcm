import validate from '../../middlewares/validate';

import express from 'express'
import { companyConfigsController } from '../../controllers';
import { companyConfigsValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { companyInsurancesRoute } from './companyInsurances.route';
const router = express.Router({ mergeParams: true });

router
  .route('/salary-config/set-type')
  .put(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(companyConfigsValidations.setSalaryConfigType),
    companyConfigsController.setSalaryConfigType
  )

router
  .route('/salary-config/region-based')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(companyConfigsValidations.addRegionConfig),
    companyConfigsController.addRegionConfig
  )
  .get(
    companyConfigsController.getAllRegionConfig
  )

router
  .route('/salary-config/region-based/:regionId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(companyConfigsValidations.updateRegionConfig),
    companyConfigsController.updateRegionConfig
  )
  .delete(
    // addDataToBody({
    //   de: RequestParams.USERID,
    // }),
    validate(companyConfigsValidations.deleteRegionConfig),
    companyConfigsController.deleteRegionConfig
  )

  router.use(
    '/insurances',
    companyInsurancesRoute
  );

export const companyConfigsRoute = router;
