// import { TABLE_COMPANY, TABLE_CORE_RCP, TABLE_CORE_RCP_BY_STAGE, TABLE_USER, } from "../config/table";
// import mongoose from 'mongoose';
// import { paginatePlugin, toJSONPlugin } from "./plugins";
// import { IModel, IRCPByStageDoc } from "../types";
// mongoose.Promise = require('bluebird');

// type IRCPByStageModel = IModel<IRCPByStageDoc>

// const rcpByStageSchema = new mongoose.Schema<IRCPByStageDoc>(
//   {
//     companyId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: TABLE_COMPANY,
//       required: true,
//     },
//     rcpId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: TABLE_CORE_RCP,
//       required: true,
//     },

//     stage: {
//       type: Number,
//       required: true,
//     },
//     value: {
//       type: Number,
//       required: true,
//     },

//     createdById: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: TABLE_USER,
//       required: true,
//     },
//     updatedById: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: TABLE_USER,
//       required: false,
//     },
//     deletedById: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: TABLE_USER,
//       required: false
//     },
//     deletedAt: { type: Date, required: false },
//   },
//   {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//     timestamps: {
//       createdAt: 'createdAt',
//       updatedAt: 'updatedAt',
//     }
//   }
// );

// rcpByStageSchema.plugin(toJSONPlugin);
// rcpByStageSchema.plugin(paginatePlugin);

// /**
//  * @typedef RCPByStage
//  */
// export const RCPByStageModel = mongoose.model<IRCPByStageDoc, IRCPByStageModel>(TABLE_CORE_RCP_BY_STAGE, rcpByStageSchema);