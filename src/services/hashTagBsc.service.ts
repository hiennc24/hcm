import { HashtagBscModel } from "../models"
import { IHashtagBscDoc } from "../types";

const getListHashTag = async(): Promise<IHashtagBscDoc[] | null> => {
  const data = await HashtagBscModel.find();
  return data;
}

const getListHashtagByBscType = async(bscType: any): Promise<IHashtagBscDoc[] | null> => {
  const data = await HashtagBscModel.find({ bscType});
  return data;
}

const getHashtag = async(hashTagId: string): Promise<IHashtagBscDoc | null> => {
  const data = await HashtagBscModel.findOne(
    { 
      _id: hashTagId,
      deletedById: { $exists: false }
    }
  );
  return data;
} 

const createHashtag = async(body: any): Promise<IHashtagBscDoc> => {
  const data = new HashtagBscModel(body);
  data.save();
  return data;
}

export const hashTagBscService = {
  getListHashtagByBscType,
  getHashtag,
  createHashtag,
  getListHashTag
}