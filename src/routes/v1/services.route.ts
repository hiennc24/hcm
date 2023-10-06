import validate from '../../middlewares/validate';
import express from 'express'
import { servicesController } from '../../controllers';
import { servicesValidations } from '../../validations';
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
    validate(servicesValidations.create),
    servicesController.create
  )
  .get(
    validate(servicesValidations.getAll),
    convertSearchFilter("name"),
    servicesController.getAll
  )

router
  .route('/:servicesId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(servicesValidations.update),
    servicesController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(servicesValidations.deleteOne),
    servicesController.dedeteOne
  )
  .get(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(servicesValidations.getAll),
    convertSearchFilter("name"),
    servicesController.getdetail
  )
// thêm get detail từng sp
router
  .route('/delete-many')
  .post(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(servicesValidations.deleteMany),
    servicesController.deleteMany
  )
router
  .route('/block-many')
  .post(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(servicesValidations.updateMany),
    servicesController.updateMany
  )
export const servicesRoute = router;
