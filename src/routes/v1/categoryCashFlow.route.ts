import validate from '../../middlewares/validate';
import express from 'express'
import { categoryCashFlowController } from '../../controllers';
import { categoryCashFlowValidations } from '../../validations';
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
    validate(categoryCashFlowValidations.create),
    categoryCashFlowController.create
  )
  .get(
    validate(categoryCashFlowValidations.getAll),
    convertSearchFilter("name"),
    categoryCashFlowController.getAll
  )

router
  .route('/:categoryCashFlowId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(categoryCashFlowValidations.update),
    categoryCashFlowController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(categoryCashFlowValidations.deleteOne),
    categoryCashFlowController.dedeteOne
  )
  .get(
    validate(categoryCashFlowValidations.getdetail),
    categoryCashFlowController.getdetail
  )

router
  .route('/delete-many')
  .post(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(categoryCashFlowValidations.deleteMany),
    categoryCashFlowController.deleteMany
  )
router
  .route('/block-many')
  .post(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(categoryCashFlowValidations.updateMany),
    categoryCashFlowController.updateMany
  )
export const categoryCashFlowRoute = router;
