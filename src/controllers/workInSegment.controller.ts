import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { workInSegmentService } from '../services/workInSegment.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { businessProcessService, departmentService } from '../services';
import { pick } from '../utils/pick';
// import ApiError from '../utils/ApiError';
// import httpStatus from 'http-status';
// import { pick } from '../utils/pick';

const create = catchAsync(async (req: Request, res: Response) => {
  const { companyId } = req.body;
  const position = await workInSegmentService.getCount({
    companyId
  })

  const data = await workInSegmentService.create({ ...req.body, position });
  res.send(data)
});

const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await workInSegmentService.updateOne(
    { _id: req.params.workInSegmentId }, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'workInSegment.not_found'));
  }
  res.send(data)
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const { searchJson, ...others } = pick(req.query, ['departmentId', 'segmentId', 'searchJson']);
  const data = await workInSegmentService.getAll(
    {
      ...searchJson?.toString() || "{}",
      ...others
    }
  );
  res.send(data)
});

const getList = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['segmentId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await workInSegmentService.getList(filter, options);
  res.send(data)
})

const groupByDepartment = catchAsync(async (req: Request, res: Response) => {
  const [data, process] = await Promise.all([
    workInSegmentService.groupByDepartment(req.companyId),
    businessProcessService.getAll({
      valueChainId: req.query.valueChainId
    })
  ])

  // eslint-disable-next-line prefer-const
  let data2: any = {};
  data.forEach((d: any) => {
    const { _id, entries, ...others } = d;
    // eslint-disable-next-line prefer-const
    let objs: any = {};
    entries.forEach((el: any) => {
      if (!objs[el.segmentId]) objs[el.segmentId] = {
        segmentId: el.segmentId,
        works: []
      }
      objs[el.segmentId].works.push(el)
      // segmentIds[el.segmentId] = el.segmentId
    });
    data2[d._id || "null"] = {
      _id,
      segments: objs,
      ...others
    }
  })

  const departments = await departmentService.getListByIds(Object.keys(data2).filter(dId => dId != "null"));

  // Promise
  const result = Object.keys(data2).map(dKey => {
    const data2Item = data2[dKey];
    const departmentInfo = departments.find((d: any) => {
      console.log("ssss", {
        a1: d._id, a2: data2Item._id
      })
      return !!data2Item._id && d._id.toString() == data2Item._id.toString()
    })
    return {
      _id: data2Item._id,
      department: departmentInfo,
      process: process.map((p: any) => {
        return {
          ...p.toJSON(),
          segments: p.segments.map((seg: any) => {
            return {
              ...seg.toJSON(),
              works: data2[data2Item.id || "null"].segments[seg.id]?.works
            }
          })
        }
      })
    }
  })
  res.send({ result, data2 })
});



const dedeteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const [data] = await Promise.all([
    workInSegmentService.updateOne(
      { _id: req.params.workInSegmentId, companyId: req.companyId }, req.body
    ),
  ]);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

// workInSegment

const getdetail = catchAsync(async (req: Request, res: Response) => {

  const data = await workInSegmentService.getById(req.params.workInSegmentId);
  res.send(data)
});


export const workInSegmentController = {
  groupByDepartment,
  getList,
  getAll,
  create,
  updateOne,
  dedeteOne,
  getdetail
}
