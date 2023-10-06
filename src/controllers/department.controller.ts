import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { departmentService } from '../services';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { pick } from '../utils/pick';
import { IDepartmentDoc } from '../types';

const create = catchAsync(async (req: Request, res: Response) => {
  const folder = await departmentService.createDepartment({
    ...req.body,
  });
  res.send(folder)
});

const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { departmentId } = pick(req.params, ['departmentId'])
  const { parentId, ...body } = req.body;

  const treeDepartment = await departmentService.getTree(
    req.companyId, departmentId, { skipPopulateParent: true, skipPersonnelPositions: true }, false
  )
  const department = treeDepartment[0];
  const checkChildrens = (childrens: any[]) => {
    return Promise.all(
      childrens.map((child: any) => {
        return new Promise((resolve: any, reject: any) => {
          if (child.id == parentId) {
            reject()
          } else if (child.childrens.length == 0) {
            resolve()
          } else {
            // child.id != parentId && child.childrens.length > 0
            checkChildrens(child.childrens)
              .then(() => {
                resolve()
              })
              .catch(() => {
                reject()
              })
          }
        })
      })
    )
  }

  checkChildrens(department.childrens)
    .then(async () => {
      const data = await departmentService.update(
        {
          companyId: req.companyId,
          _id: departmentId
        },
        {
          parentId,
          ...body,
        });

      if (!data) {
        return next(new ApiError(httpStatus.BAD_GATEWAY, 'Not found'));
      }
      res.send(data)
    })
    .catch(() => {
      return next(new ApiError(httpStatus.BAD_GATEWAY, 'Invalid data'));
    })
});

const deleteById = catchAsync(async (req: Request, res: Response) => {
  const { departmentId } = pick(req.params, ['departmentId']);
  await departmentService.update({
    $and: [
      {
        _id: departmentId,
      },
      {
        $or: [
          { isSystem: false },
          {
            isSystem: true,
            allowDeletion: true
          }
        ]
      }
    ]
  }, req.body);

  res.status(httpStatus.NO_CONTENT).send()
});

const getTree = catchAsync(async (req: Request, res: Response) => {
  const { departmentId, hasPosition, hasSystem } = pick(req.query, ['departmentId', 'hasPosition', "hasSystem"]);
  const data: any = await departmentService.getTree(req.companyId, departmentId, {
    skipPopulateParent: true,
    skipPersonnelPositions: !hasPosition
  }, hasSystem);

  res.send(data)
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const { departmentId, hasPosition, hasSystem } = pick(req.query, ['departmentId', 'hasPosition', "hasSystem"]);
  const data: any = await departmentService.getTree(req.companyId, departmentId, {
    skipPopulateParent: true,
    skipPersonnelPositions: !hasPosition
  }, hasSystem);

  const getCreateRow = (
    typeRow: "createDepartment" | "createPositionDepartment" | "createPositionPart",
    createFromParent?: string
  ) => {
    return {
      key: `${typeRow}_${createFromParent}`,
      typeRow, createFromParent
    }
  }

  const formatData: any = (department: IDepartmentDoc, noObj: string[] = ["1"]) => {
    const { childrens, personnelPositions, ...others } = department;
    // console.log("noObj", noObj)
    return {
      no: `${noObj.join(".")}`,
      key: department._id.toString(),
      // level,
      ...others,
      children: personnelPositions
        .map((pp: any, index: number) => {
          return {
            no: noObj.concat(`${index + 1}`).join("."),
            key: pp._id.toString(),
            // level: level + 1,
            ...pp,
            isPersonnelPositions: true
          }
        })
        .concat(getCreateRow(!department.parentId ? "createPositionDepartment" : "createPositionPart", department._id.toString()))
        .concat(childrens.map((child: any, index: number) => formatData(child, noObj.concat(
          `${personnelPositions.length + index + 1}`
        ))))
      // .concat(getCreateRow("createDepartment", department._id.toString()))
    }
  }
  res.send(
    data
      .map((department: IDepartmentDoc, index: number) => formatData(department.toJSON(), [index + 1]))
    // .concat(getCreateRow("createDepartment"))
  )
});

const getTreePosition = catchAsync(async (req: Request, res: Response) => {
  const { departmentId } = pick(req.query, ['departmentId']);
  const treeDepartment: any = await departmentService.getTree(req.companyId, departmentId, {
    skipPopulateParent: true
  });
  // res.send(treeDepartment)
  // const data = treeDepartment[0];

  // eslint-disable-next-line prefer-const
  let positions: any[] = [];
  const pushPositions = (department: IDepartmentDoc) => {
    console.log("department.personnelPositions", department.personnelPositions)
    positions = positions.concat(department.personnelPositions);
    if (department.childrens.length > 0) {
      department.childrens.forEach(child => {
        pushPositions(child)
      })
      // pushPositions()
    }
  }
  // treeDepartment.fo
  treeDepartment.forEach((dp:any)=>{
    pushPositions(dp)
  })

  res.send(positions)
});

const getAllPosition = catchAsync(async (req: Request, res: Response) => {
  const { departmentId } = pick(req.query, ['departmentId']);
  const treeDepartment: any = await departmentService.getTree(req.companyId, departmentId, {
    skipPopulateParent: true
  }, false);
  // const data = treeDepartment[0];

  // eslint-disable-next-line prefer-const
  let positions: any[] = [];
  const pushPositions = (dep: IDepartmentDoc) => {
    positions = positions.concat(dep.personnelPositions.map(perPosition => {
      return {
        ...perPosition.toJSON(),
        department: {
          name: dep.name,
          id: dep.id
        }
      }
    }));
    if (dep.childrens.length > 0) {
      dep.childrens.forEach(child => {
        pushPositions(child)
      })
      // pushPositions()
    }
  }
  // pushPositions(data)
  treeDepartment.forEach((dp:any)=>{
    pushPositions(dp)
  })

  res.send(positions)
});

const getManagement = catchAsync(async (req: Request, res: Response) => {
  const getManagement = await departmentService.getManagement()

  res.send(getManagement)
});

const getList = catchAsync(async (req: Request, res: Response) => {
  const { departmentId, hasPosition, hasSystem } = pick(req.query, ['departmentId', 'hasPosition', "hasSystem"]);
  const data: any = await departmentService.getTree(req.companyId, departmentId, {
    skipPopulateParent: true,
    skipPersonnelPositions: !hasPosition
  }, hasSystem);

  // eslint-disable-next-line prefer-const
  let allDepartments: any[] = [];
  const pushDepartments = (department: IDepartmentDoc, level = 0) => {
    const {
      _id,
      id,
      name,
    } = department;
    allDepartments.push({
      _id,
      id,
      name,
      title: `${(new Array(level)).fill(null).join("-")}${name}`,
    });
    if (department.childrens.length > 0) {
      department.childrens.forEach(child => {
        pushDepartments(child, level + 1)
      })
    }
  }
  data.forEach((topDepar: any) => {
    pushDepartments(topDepar)
  })

  res.send(allDepartments)
});

const toggleSystem = catchAsync(async (req: Request, res: Response) => {
  const data = await departmentService.toggleSystem(req.body);
  res.send(data)
});

const getdetail = catchAsync(async (req: Request, res: Response) => {
  const data = await departmentService.getById(req.params.departmentId);
  res.send(data)
});

const getAllSystem = catchAsync(async (req: Request, res: Response) => {
  const data = await departmentService.getList({
    isSystem: true,
  }, {
    skipPopulateChildrens: true,
    skipPopulateParent: true,
    skipPersonnelPositions: true
  });
  res.send(data)
});


export const departmentController = {
  create,
  update,
  getTree,
  getAll,
  getList,
  deleteById,
  getTreePosition,
  toggleSystem,
  getdetail,
  getAllSystem,
  getAllPosition,
  getManagement,
}
