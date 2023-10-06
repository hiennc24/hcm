import validate from '../../middlewares/validate';

import express from 'express'
import { departmentController } from '../../controllers';
import { departmentValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { personnelPositionRoute } from './personnelPosition.route';
import { personnelPositionRoute1 } from './personnelPosition1.route'
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(departmentValidations.create),
    departmentController.create
  )
  .get(
    validate(departmentValidations.getList),
    departmentController.getList
  )

router
  .route('/system')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(departmentValidations.activeSystem),
    departmentController.toggleSystem
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(departmentValidations.unActiveSystem),
    departmentController.toggleSystem
  )
  .get(
    departmentController.getAllSystem
  )

router
  .route('/management')
  .get(
    departmentController.getManagement
  )

router
  .route('/tree')
  .get(
    validate(departmentValidations.getTree),
    departmentController.getTree
  )

router
  .route('/all')
  .get(
    validate(departmentValidations.getTree),
    departmentController.getAll
  )

router
  .route('/list-position')
  .get(
    validate(departmentValidations.getList),
    departmentController.getAllPosition
  )

router
  .route('/tree-position')
  .get(
    validate(departmentValidations.getList),
    departmentController.getTreePosition
  )

router
  .route('/:departmentId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(departmentValidations.update),
    departmentController.update
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(departmentValidations.deleteById),
    departmentController.deleteById
  )
  .get(
    validate(departmentValidations.getdetail),
    departmentController.getdetail
  )

router.use(
  '/:departmentId/personnel-position',
  personnelPositionRoute
);

router.use(
  '/personnel-position',
  personnelPositionRoute1
);
export const departmentRoute = router;
