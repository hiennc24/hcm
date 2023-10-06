import express from 'express'
import { companyConfigsController } from '../../controllers';
import validate from '../../middlewares/validate';
import { companyConfigsValidations } from '../../validations';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    companyConfigsController.getInsurances
  )
  .put(
    validate(companyConfigsValidations.updateInsurance),
    companyConfigsController.updateInsurance
  )

export const companyInsurancesRoute = router;
