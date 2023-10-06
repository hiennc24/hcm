import validate from '../../middlewares/validate';

import express from 'express'
import { RequestParams } from '../../types';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { classifyBscValidations } from '../../validations/classifyBsc.validation';
import { classifyBscController } from '../../controllers/classify.controller';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    validate(classifyBscValidations.getListClassifyByBscType),
    classifyBscController.getListClassifyByBscType
  )
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(classifyBscValidations.createClassify),
    classifyBscController.createClassify
  )

// router
//   .route('/list')
//   .get(
//     classifyBscController.getListHashTag
//   )

router
  .route('/detail/:classifyId')
  .get(
    validate(classifyBscValidations.getClassifyById),
    classifyBscController.getClassifyById
  )


export const classifyBscRoute = router;
