import validate from '../../middlewares/validate';

import express from 'express'
import { businessSectorController } from '../../controllers';
import { businessSectorValidations } from '../../validations';
const router = express.Router({ mergeParams: true });


router
  .route('/all')
  .get(
    validate(businessSectorValidations.getAll),
    businessSectorController.getAll
  )

router
  .route('/')
  .get(
    validate(businessSectorValidations.getList),
    businessSectorController.getList
  )

export const businessSectorRoute = router;
