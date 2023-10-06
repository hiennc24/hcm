import validate from '../../middlewares/validate';

import express from 'express'
import { businessCategoryController } from '../../controllers';
import { businessCategoryValidations } from '../../validations';
import { businessSectorRoute } from './businessSector.route';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    validate(businessCategoryValidations.getList),
    businessCategoryController.getList
  )

router
  .route('/all')
  .get(
    validate(businessCategoryValidations.getAll),
    businessCategoryController.getAll
  )

router.use('/:businessCategoryId/sectors', businessSectorRoute);

export const businessCategoryRoute = router;
