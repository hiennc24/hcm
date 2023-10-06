import { HashtagModel } from "../models";
import { IHashtagDoc } from "../types";

const createOrUpdate = async (filter: object, update: object): Promise<IHashtagDoc | null> => {
  return HashtagModel.findOneAndUpdate(filter, update, {
    upsert: true, setDefaultsOnInsert: true, new: true
  })
};

export const hashtagService = {
  createOrUpdate,
}
