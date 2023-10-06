import validate from '../../middlewares/validate';

import express from 'express'
import { locationController } from '../../controllers';
import { locationValidations } from '../../validations';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    validate(locationValidations.getAll),
    locationController.getAll
  )

// location
export const locationRoute = router;
