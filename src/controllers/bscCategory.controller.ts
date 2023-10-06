import { Request, Response } from "express"
import { bscCategoryService } from "../services/bscCategory.service";
import { catchAsync } from "../utils/catchAsync"

const getListCategory = catchAsync(async (req: Request, res: Response) => {

  const data = await bscCategoryService.getListCategory({
    companyId: req.companyId,
  });
  res.send(data)
});

// const createListCategory = catchAsync(async (req: Request, res: Response) => {
//   const companyId = req.companyId;

//   const data = await bscCategoryService.createListCategory(companyId);
//   res.send(data);
// })

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const companyId = req.companyId;
  const { bscCategoryKey } = req.params;
  const body = req.body;

  const data = await bscCategoryService.updateCategory(companyId, bscCategoryKey, body);
  res.send(data);
})

const getdetail = catchAsync(async (req: Request, res: Response) => {
  const data = await bscCategoryService.getDetail(req.companyId, req.params.bscCategoryKey);
  res.send(data)
});

export const bscCategoryController = {
  getListCategory,
  // createListCategory,
  updateCategory, getdetail
}