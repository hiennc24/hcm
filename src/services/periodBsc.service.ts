import { PeriodBscModel } from "../models/periodBsc.model";

const createPeriod = async (body: any) => {
  const data = new PeriodBscModel(body);
  data.save();
  return data;
}

const getListPeriodByBscType = async (bscType: any) => {
  const data = await PeriodBscModel.find({ bscType });
  return data;
}

const getPeriodById = async (periodId: string) => {
  const data = await PeriodBscModel.findById(periodId);
  return data;
}

export const periodBscService = {
  createPeriod,
  getListPeriodByBscType,
  getPeriodById
}