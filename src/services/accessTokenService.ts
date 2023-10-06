import { AccessTokenModel } from "../models";
import { IAccessTokenDoc } from "../types";

const createAccessToken = async (body: any): Promise<IAccessTokenDoc | null> => {
  return AccessTokenModel.create(body);
};

const getAccessToken = async (AccessTokenName: string): Promise<IAccessTokenDoc | null> => {
  return AccessTokenModel.findOne({ AccessTokenName });
};

const findOne = async (body: any): Promise<IAccessTokenDoc | null> => {
  return AccessTokenModel.findOne(body);
};

export const accessTokenService = {
  createAccessToken,
  getAccessToken,
  findOne,
}
