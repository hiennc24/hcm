// import { TABLE_COMPANY, TABLE_CORE_RCP, TABLE_CORE_RCP_BY_STAGE, TABLE_USER, TABLE_CORE_RCP_BY_MONTH } from "../config/table";
// import mongoose from 'mongoose';
// import { paginatePlugin, toJSONPlugin } from "./plugins";
// import { IModel, IRCPByMonthDoc } from "../types";
// mongoose.Promise = require('bluebird');

// type IRCPByMonthModel = IModel<IRCPByMonthDoc>

// const rcpByMonthSchema = new mongoose.Schema<IRCPByMonthDoc>(
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

//     month: {
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

// rcpByMonthSchema.plugin(toJSONPlugin);
// rcpByMonthSchema.plugin(paginatePlugin);

// /**
//  * @typedef RCPByMonth
//  */
// export const RCPByMonthModel = mongoose.model<IRCPByMonthDoc, IRCPByMonthModel>(TABLE_CORE_RCP_BY_MONTH, rcpByMonthSchema);