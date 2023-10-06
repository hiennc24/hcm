import { departmentService } from ".";
import { PersonnelPositionModel } from "../models/personnelPosition.model";
import { IPersonnelPositionDoc } from "../types";

const createPersonnelPosition = async (body: any): Promise<IPersonnelPositionDoc | null> => {
  return PersonnelPositionModel.create(body);
};

const updateById = async (entityId: string, body: any): Promise<IPersonnelPositionDoc | null> => {
  return PersonnelPositionModel.findOneAndUpdate({
    _id: entityId,
    deletedById: { $exists: false }
  }, body, { new: true });
};

const getList = async (entityId: string, filter: { [x: string]: string }, option: any): Promise<IPersonnelPositionDoc[]> => {
  return PersonnelPositionModel.paginate({
    ...filter,
    departmentId: entityId,
    deletedById: { $exists: false }
  }, option);
};

const getAll = async (entityId: string, filter: { [x: string]: any }, option?: any): Promise<IPersonnelPositionDoc[]> => {
  return PersonnelPositionModel.find({
    ...filter,
    departmentId: entityId,
    deletedById: { $exists: false }
  }, option);
};
const getAllPosition = async (filter: { [x: string]: any }): Promise<IPersonnelPositionDoc[]> => {
  return PersonnelPositionModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const checkPersonnelInDepartment = async (personnelPositionId: string, departmentId: string): Promise<any> => {
  const depInTreeArr = await departmentService.getAllDepartmentIdsInTree(departmentId)

  const perPosition = await PersonnelPositionModel.findOne({
    _id: personnelPositionId,
    departmentId: { $in: depInTreeArr },
    deletedById: { $exists: false }
  });
  return !!perPosition;
};

const getPersonnelIdsInDepartment = async (departmentId: string): Promise<any> => {
  const depInTreeArr = await departmentService.getAllDepartmentIdsInTree(departmentId)

  return PersonnelPositionModel.find({
    departmentId: { $in: depInTreeArr },
    deletedById: { $exists: false }
  });
};

export const personnelPositionService = {
  createPersonnelPosition,
  updateById,
  getList,
  getAll,
  getPersonnelIdsInDepartment,
  checkPersonnelInDepartment,
  getAllPosition
}
