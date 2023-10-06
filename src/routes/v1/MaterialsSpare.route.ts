import validate from '../../middlewares/validate';

import express from 'express'
import { materialsSpareController } from '../../controllers';
import { materialsSpareValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { convertSearchFilter } from '../../middlewares/convertSearchFilter';
// import { rcpByMonthRoute } from './rcpByMonth.route';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(materialsSpareValidations.create),
    materialsSpareController.create
  )
  .get(
    validate(materialsSpareValidations.getAll),
    convertSearchFilter("name"),
    materialsSpareController.getAll
  )

router
  .route('/:materialsSpareId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(materialsSpareValidations.update),
    materialsSpareController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(materialsSpareValidations.deleteOne),
    materialsSpareController.dedeteOne
  )
  .get(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(materialsSpareValidations.getAll),
    convertSearchFilter("name"),
    materialsSpareController.getdetail
  )
router
  .route('/delete-many')
  .post(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(materialsSpareValidations.deleteMany),
    materialsSpareController.deleteMany
  )
router
  .route('/block-many')
  .post(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(materialsSpareValidations.updateMany),
    materialsSpareController.updateMany
  )
export const materialsSpareRoute = router;
