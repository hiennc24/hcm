import { RCPValueModel } from "../models";
import { IRCPValueDoc } from "../types";

const updateById = async (filter: any, body: any): Promise<IRCPValueDoc | null> => {
  return RCPValueModel.findOneAndUpdate(filter, body);
};

export const rcpValueService = {
  updateById,
}
