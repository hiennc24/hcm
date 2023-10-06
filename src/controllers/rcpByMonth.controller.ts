// import { NextFunction, Request, Response } from 'express';
// import { catchAsync } from '../utils/catchAsync';
// import { rcpByMonthService } from '../services/rcpByMonth.service';
// import ApiError from '../utils/ApiError';
// import httpStatus from 'http-status';

// const setOrUpdate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const { rcpId, stageId, monthId } = req.params;
//   const month = Number(monthId)
//   const stage = Number(stageId)
//   if (month >= (stage - 1) * 3 + 1 && month <= (stage) * 3) {
//     const data = await rcpByMonthService.createOrUpdate({
//       rcpId,
//       stage,
//       month
//     }, req.body);
//     res.send(data)
//   } else {
//     return next(new ApiError(httpStatus.BAD_REQUEST, 'Month invalid'));
//   }
// });

// export const rcpByMonthController = {
//   setOrUpdate,
// }
