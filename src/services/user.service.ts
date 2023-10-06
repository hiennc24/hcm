import { UserModel } from "../models/user.model";
import { IUserDoc } from "../types";

const updateUser = async (userId: string, body: any): Promise<IUserDoc | null> => {
  console.log("bodybody", body)
  return UserModel.findOneAndUpdate({
    _id: userId,
    deletedById: { $exists: false }
  }, body, { new: true });
};

const getList = async (filter: any, options: any): Promise<IUserDoc[]> => {
  return UserModel.paginate({
    ...filter,
    deletedById: { $exists: false }
  }, {
    ...options,
    // sort: {
    //   position: 1
    // }
  });
};

export const userService = {
  updateUser,
  getList,
}
