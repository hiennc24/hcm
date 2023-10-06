import * as mongoose from 'mongoose';
import { IDoc } from "./entityTypes";

export interface IPFolderDoc extends IDoc {
  companyId: mongoose.ObjectId,
  name: string;

  isSystem: boolean;
}