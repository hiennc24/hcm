import validate from '../../middlewares/validate';
import express from 'express'
import { administrationListController } from '../../controllers';
import { administrationListValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { convertSearchFilter } from '../../middlewares/convertSearchFilter';
import { customCategoryRoute } from './customCategory.route';
import { categorySpendingRoute } from './categorySpending.route'
import { categoryCashFlowRoute } from './categoryCashFlow.route'
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(administrationListValidations.create),
    administrationListController.create
  )
  .get(
    validate(administrationListValidations.getAll),
    convertSearchFilter("name"),
    administrationListController.getAll
  )
router
  .route('/delete-many')
  .post(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(administrationListValidations.deleteMany),
    administrationListController.deleteMany
  )
router
  .route('/block-many')
  .post(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(administrationListValidations.updateMany),
    administrationListController.updateMany
  )
router
  .route('/:administrationListId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(administrationListValidations.update),
    administrationListController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(administrationListValidations.deleteOne),
    administrationListController.dedeteOne
  )
  .get(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(administrationListValidations.getAll),
    convertSearchFilter("name"),
    administrationListController.getdetail
  )


router.use(
  '/:administrationListId/categorykey/:key/custom-Category',
  // inBSCTargetMid,
  customCategoryRoute
);

router.use(
  '/:administrationListId/categorykey/:key/category-spending',
  // inBSCTargetMid,
  categorySpendingRoute
)
router.use(
  '/:administrationListId/categorykey/:key/category-cashflow',
  // inBSCTargetMid,
  categoryCashFlowRoute
)

export const administrationListRoute = router;
