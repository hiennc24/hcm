import httpStatus from "http-status";
import { departmentWithChildFields } from "../config/populateConfigs";
import { DepartmentModel } from "../models";
import { getSystemDepartment, SYSTEM_DEPARTMENT_TYPE } from "../modules";
import { IDepartmentDoc } from "../types";
import ApiError from "../utils/ApiError";

const createDepartment = async (body: any): Promise<IDepartmentDoc | null> => {
  return DepartmentModel.create(body);
};

const update = async (filter: any, body: any): Promise<IDepartmentDoc | null> => {
  // console.log("filter", filter)
  return DepartmentModel.findOneAndUpdate({
    deletedById: { $exists: false },
    ...filter,
  }, body, { new: true });
};

const findById = async (entityId: string, options = {
  skipPopulateChildrens: true,
  skipPopulateParent: true,
  skipPersonnelPositions: true,
}): Promise<any> => {
  return DepartmentModel
    .findOne({
      _id: entityId,
      deletedById: { $exists: false }
    }, undefined, options)
    .select(departmentWithChildFields)
};

const getTree = async (
  companyId: string,
  departmentId?: string,
  options?: {
    skipPopulateChildrens?: boolean,
    skipPopulateParent?: boolean,
    skipPersonnelPositions?: boolean,
  },
  hasSystem = false
): Promise<any> => {
  const filter = !!departmentId
    ? {
      companyId,
      _id: departmentId
    }
    : {
      companyId,
      parentId: { $exists: false }
    }
  const department: any = await DepartmentModel
    .find({
      ...!!hasSystem ? {} : { isSystem: hasSystem },
      deletedById: { $exists: false },
      ...filter,
    }, undefined, options)
    .sort({
      systemSort: 1,
    })
    .select(departmentWithChildFields)

  return department
};

const getList = async (
  filter: any,
  populateOption?: {
    skipPopulateChildrens?: boolean,
    skipPopulateParent?: boolean,
    skipPersonnelPositions?: boolean
  },
  hasSystem?: boolean
): Promise<any> => {
  const department: any = await DepartmentModel
    .find({
      ...!!hasSystem ? {} : { isSystem: false },
      deletedById: { $exists: false },
      ...filter,
    }, undefined, populateOption)
    .select(departmentWithChildFields)

  return department
};

const getAllDepartmentIdsInTree = async (departmentId: string): Promise<string[]> => {
  const dep = await findById(departmentId, {
    skipPopulateParent: true,
    skipPopulateChildrens: false,
    skipPersonnelPositions: true
  })
  // eslint-disable-next-line prefer-const
  let depArr = [departmentId];

  const pushChilds = async (childs: any) => {
    childs.forEach(async (val: any) => {
      depArr.push(val.id);
      if (val.childrens.length > 0) {
        await pushChilds(val.childrens)
      }
    })
  }
  if (dep.childrens.length > 0) {
    await pushChilds(dep.childrens)
  }

  return depArr
};


const getListByIds = async (ids: string[]): Promise<any> => {
  console.log("ids", ids)
  const department: any = await getList({
    _id: { $in: ids }
  }, {

    skipPopulateChildrens: true,
    skipPopulateParent: true,
    skipPersonnelPositions: true,
  })

  return department
};

const toggleSystem = async (body: any): Promise<IDepartmentDoc | null> => {
  const { systemType, deletedById, ...others } = body;
  return DepartmentModel.findOneAndUpdate({
    systemType
  }, {
    ...getSystemDepartment(systemType),
    ...others,
    ...!!deletedById ? {
      deletedById
    } : {
      $unset: {
        deletedById: 1,
        deletedAt: 1
      }
    }
  }, {
    upsert: true, setDefaultsOnInsert: true, new: true
  });
};

const getById = async (entityId: string): Promise<IDepartmentDoc | null> => {
  return DepartmentModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};

const getManagement = async (): Promise<IDepartmentDoc[]> => {
  const directorate = await DepartmentModel.findOne({
    systemType: SYSTEM_DEPARTMENT_TYPE.DEPARTMENT_DIRECTORATE,
    deletedById: { $exists: false }
  }, undefined, {
    skipPopulateChildrens: true,
    skipPopulateParent: true,
    skipPersonnelPositions: true,
  })
  if (!directorate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  return DepartmentModel.find({
    $and: [
      {
        deletedById: { $exists: false }
      },
      {
        $or: [
          {
            isSystem: true,
          },
          {
            parentId: directorate.id
          },
          {
            isSystem: false,
            parentId: { $exists: false }
          }
        ]
      }
    ]
  }, undefined, {
    skipPopulateChildrens: true,
    skipPopulateParent: true,
    skipPersonnelPositions: true,
    // sort: { systemSort: 1 }
  }).sort({
    systemSort: 1,
    isSystem: -1,
  });
};

export const departmentService = {
  getListByIds,
  findById,
  createDepartment,
  update,
  getTree,
  getList,
  getAllDepartmentIdsInTree,
  toggleSystem,
  getById,
  getManagement,
}

