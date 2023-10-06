import { UnitBscModel } from "../models/unitBsc.model";

const createUnit = async (body: any) => {
  const data = new UnitBscModel(body);
  data.save();
  return data;
}

const getListUnitByBscType = async (bscType: any) => {
  const data = await UnitBscModel.find({ bscType });
  return data;
}

const getUnitById = async (unitId: string) => {
  const data = await UnitBscModel.findById(unitId);
  return data;
}

export const unitBscService = {
  createUnit,
  getListUnitByBscType,
  getUnitById
}