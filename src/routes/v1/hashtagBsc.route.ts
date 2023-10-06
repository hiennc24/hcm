import validate from '../../middlewares/validate';

import express from 'express'
import { hashTagBscController } from '../../controllers/hashTagBsc.controller';
import { hashTagBscValidations } from '../../validations/hashTagBsc.validation';
import { RequestParams } from '../../types';
import { addDataToBody } from '../../middlewares/addUserToBody';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    validate(hashTagBscValidations.getListHashtagByBscType),
    hashTagBscController.getListHashtagByBscType
  )
  .post(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(hashTagBscValidations.createHashTag),
    hashTagBscController.createHashTag
  )

router
  .route('/list')
  .get(
    hashTagBscController.getListHashTag
  )

router
  .route('/detail/:hashTagId')
  .get(
    validate(hashTagBscValidations.getHashTag),
    hashTagBscController.getHashtag
  )


export const hashtagBscRoute = router;
