import { LocationModel } from "../models";
import { ILocationDoc } from "../types";

const getAll = async (filter: any): Promise<ILocationDoc[]> => {
  const { search, ...others } = filter;
  return LocationModel.find({
    ...!!search ? { name: { $regex: search } } : {},
    ...others,
  });
};

export const locationService = {
  getAll,
}
