import validate from '../../middlewares/validate';

import express from 'express'
import { variableController } from '../../controllers';
import { variableValidations } from '../../validations';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    validate(variableValidations.getVariable),
    variableController.getVariable
  )

export const variableRoute = router;
