import { TABLE_COMPANY, TABLE_CORE_PRODUCT_GROUP, TABLE_PLAN_SALE, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IPlanSaleDoc } from "../types";
import { productGroupFields } from "../config/populateConfigs";
mongoose.Promise = require('bluebird');

type IPlanSaleModel = IModel<IPlanSaleDoc>

const planSaleSchema = new mongoose.Schema<IPlanSaleDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },
    productGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_PRODUCT_GROUP,
      required: true,
    },
    // value: {
    //   type: Number,
    //   required: false,
    // },

    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: false,
    },
    updatedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: false,
    },
    deletedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: false
    },
    deletedAt: { type: Date, required: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
);

planSaleSchema.virtual('productGroup', {
  ref: TABLE_CORE_PRODUCT_GROUP,
  localField: 'productGroupId',
  foreignField: '_id',
  justOne: true,
  match: { deletedById: { $exists: false } },
});

const populateArr = [
  {
    path: 'productGroup', select: productGroupFields,
  },
];

function afterSave(doc: IPlanSaleDoc, next: any) {
  doc.populate(populateArr)
    .then(() => {
      next()
    })
}
planSaleSchema.post("save", afterSave)
planSaleSchema.post("findOneAndUpdate", afterSave)
planSaleSchema.post("updateOne", afterSave)

planSaleSchema.plugin(toJSONPlugin);
planSaleSchema.plugin(paginatePlugin);

/**
 * @typedef PlanSale
 */
export const PlanSaleModel = mongoose.model<IPlanSaleDoc, IPlanSaleModel>(TABLE_PLAN_SALE, planSaleSchema);