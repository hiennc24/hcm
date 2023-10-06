import validate from '../../middlewares/validate';

import express from 'express'
import { commodityListController } from '../../controllers';
import { commodityListValidations } from '../../validations';
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
    validate(commodityListValidations.create),
    commodityListController.create
  )
  .get(
    validate(commodityListValidations.getAll),
    convertSearchFilter("name"),
    commodityListController.getAll
  )

router
  .route('/:commodityListId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(commodityListValidations.update),
    commodityListController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(commodityListValidations.deleteOne),
    commodityListController.dedeteOne
  )
  .get(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(commodityListValidations.getAll),
    convertSearchFilter("name"),
    commodityListController.getdetail
  )
router
  .route('/delete-many')
  .post(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(commodityListValidations.deleteMany),
    commodityListController.deleteMany
  )
router
  .route('/block-many')
  .post(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(commodityListValidations.updateMany),
    commodityListController.updateMany
  )
export const commodityListRoute = router;
