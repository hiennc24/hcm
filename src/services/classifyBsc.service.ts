import { ClassifyBscModel } from "../models/classify.model";

const createClassify = async (body: any) => {
  const data = new ClassifyBscModel(body);
  data.save();
  return data;
}

const getListClassifyByBscType = async (bscType: any) => {
  const data = await ClassifyBscModel.find({ bscType });
  return data;
}

const getClassifyById = async (classifyId: string) => {
  const data = await ClassifyBscModel.findById(classifyId);
  return data;
}

export const classifyBscService = {
  createClassify,
  getListClassifyByBscType,
  getClassifyById
}