import validate from '../../middlewares/validate';

import express from 'express'
import { workInSegmentController } from '../../controllers';
import { workInSegmentValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { convertSearchFilter } from '../../middlewares/convertSearchFilter';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(workInSegmentValidations.create),
    workInSegmentController.create
  )
  .get(
    validate(workInSegmentValidations.getList),
    workInSegmentController.getList
  )

router
  .route('/all')
  .get(
    validate(workInSegmentValidations.getAll),
    convertSearchFilter("name"),
    workInSegmentController.getAll
  )

router
  .route('/groupby-department')
  .get(
    validate(workInSegmentValidations.groupByDepartment),
    workInSegmentController.groupByDepartment
  )

router
  .route('/:workInSegmentId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(workInSegmentValidations.update),
    workInSegmentController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(workInSegmentValidations.deleteOne),
    workInSegmentController.dedeteOne
  )
  .get(
    workInSegmentController.getdetail
  )
// router
//   .route('/:departmentId')
//   .get(
//     validate(workInSegmentValidations.getworkDepartment),
//     workInSegmentController.getworkDepartment
//   )
// WorkInSegment
export const workInSegmentRoute = router;
