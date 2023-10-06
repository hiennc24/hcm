import validate from '../../middlewares/validate';

import express from 'express'
import { salaryGradeController } from '../../controllers';
import { salaryGradeValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { salaryGradeMid } from '../../middlewares/salaryGradeMid';
import { salaryLevelRouter } from './salaryLevel.route';

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .get(
    salaryGradeController.getSalaryGrades
  )
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(salaryGradeValidations.createSalaryGrade),
    salaryGradeController.createSalaryGrade
  )

router
  .route('/:salaryGradeId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(salaryGradeValidations.updateSalaryGrade),
    salaryGradeMid,
    salaryGradeController.updateSalaryGrade
  )
  .get(
    validate(salaryGradeValidations.getSalaryGrade),
    salaryGradeMid,
    salaryGradeController.getSalaryGrade
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(salaryGradeValidations.deleteSalaryGrade),
    salaryGradeController.deleteSalaryGrade
  )

router
  .route('/:salaryGradeId/drag')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(salaryGradeValidations.dragSalaryGrade),
    salaryGradeController.dragSalaryGrade
  )

router.use(
  '/:salaryGradeId/level',
  salaryGradeMid,
  salaryLevelRouter
);

export const salaryGradeRoute = router;
