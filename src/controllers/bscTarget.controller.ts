import { Request, Response } from "express"
import { bscTargetService } from "../services/bscTarget.service";
import { catchAsync } from "../utils/catchAsync"

const createTarget = catchAsync(async (req: Request, res: Response) => {
  const data = await bscTargetService.createTarget({
    bscCategoryKey: req.params.bscCategoryKey,
    ...req.body
  });
  res.send(data);
})

const getTarget = catchAsync(async (req: Request, res: Response) => {
  const { searchJson }: any = req.query;
  const bscCategoryKey = req.params.bscCategoryKey;
  const data = await bscTargetService.getTarget(
    bscCategoryKey,
    JSON.parse(searchJson?.toString() || "{}"),
  );
  res.send(data);
})


const updateTarget = catchAsync(async (req: Request, res: Response) => {
  const targetId = req.params.targetId;
  const body = req.body;
  const data = await bscTargetService.updateOneTarget({
    _id: targetId,
    bscCategoryKey: req.params.bscCategoryKey
  }, body);
  res.send(data)
})

const deleteTarget = catchAsync(async (req: Request, res: Response) => {
  const targetId = req.params.targetId;
  const body = req.body;
  const data = await bscTargetService.deleteOneTarget({
    _id: targetId,
    bscCategoryKey: req.params.bscCategoryKey
  }, body);
  res.send(data);
})

const getdetail = catchAsync(async (req: Request, res: Response) => {
  const targetId = req.params.targetId;
  const data = await bscTargetService.getOneTarget({
    _id: targetId,
    bscCategoryKey: req.params.bscCategoryKey
  });
  res.send(data)
});

const getAllSplitUp = catchAsync(async (req: Request, res: Response) => {
  const data = await bscTargetService.getAllSplitUp(req.companyId);
  res.send(data)
});

export const bscTargetController = {
  createTarget,
  getTarget,
  updateTarget,
  deleteTarget,
  getdetail,
  getAllSplitUp
}