import validate from '../../middlewares/validate';
import express from 'express'
import { channelController } from '../../controllers';
import { channelValidations } from '../../validations';
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
    validate(channelValidations.create),
    channelController.create
  )
  .get(
    validate(channelValidations.getAll),
    convertSearchFilter("name"),
    channelController.getAll
  )

router
  .route('/:channelId')
  .patch(
    addDataToBody({
      updatedById: RequestParams.USERID,
    }),
    validate(channelValidations.update),
    channelController.updateOne
  )
  .delete(
    addDataToBody({
      deletedById: RequestParams.USERID,
    }),
    validate(channelValidations.deleteOne),
    channelController.dedeteOne
  )
  .get(
    addDataToBody({
      createdById: RequestParams.USERID,
      companyId: RequestParams.COMPANYID,
    }),
    validate(channelValidations.getAll),
    convertSearchFilter("name"),
    channelController.getdetail
  )
// thêm get detail từng sp
export const channelRoute = router;
