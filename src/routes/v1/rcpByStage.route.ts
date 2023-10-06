// import validate from '../../middlewares/validate';

// import express from 'express'
// import { rcpByStageController } from '../../controllers';
// import { rcpByStageValidations } from '../../validations';
// import { addDataToBody } from '../../middlewares/addUserToBody';
// import { RequestParams } from '../../types';
// import { rcpByMonthRoute } from './rcpByMonth.route';
// const router = express.Router({ mergeParams: true });

// router
//   .route('/:stageId')
//   .put(
//     addDataToBody({
//       updatedById: RequestParams.USERID,
//     }),
//     validate(rcpByStageValidations.setOrUpdate),
//     rcpByStageController.setOrUpdate
//   )
// router
//   .use('/:stageId/month', rcpByMonthRoute)

// export const rcpByStageRoute = router;
