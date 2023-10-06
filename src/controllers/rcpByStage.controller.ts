// import { Request, Response } from 'express';
// import { catchAsync } from '../utils/catchAsync';
// import { rcpByStageService } from '../services/rcpByStage.service';

// const setOrUpdate = catchAsync(async (req: Request, res: Response) => {
//   const { rcpId, stageId } = req.params;
//   const data = await rcpByStageService.createOrUpdate({
//     rcpId,
//     stage: stageId
//   }, req.body);
//   res.send(data)
// });

// export const rcpByStageController = {
//   setOrUpdate,
// }
