import { TABLE_COMPANY, TABLE_CORE_MATERIALS_LIST, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { HASHTAG_TYPES, IModel, IMaterialsSpareDoc, IS_PUBLIC } from "../types";
import { hashtagService } from "../services/hashtag.service";
mongoose.Promise = require('bluebird');

type ICommodityListModel = IModel<IMaterialsSpareDoc>

const materialsSpareSchema = new mongoose.Schema<IMaterialsSpareDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },
    position: { //stt
      type: Number,
      required: true,
    },
    // mã nhãn nhóm
    productGroupCode: {
      type: String,
      required: true,
    },
    // mã hàng hoá
    commodityCode: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: false,
    },
    conversionUnit1: {
      type: String,
      required: false,
    },
    conversionUnit2: {
      type: String,
      required: false,
    },
    conversionUnit3: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
    },

    purchasePrice: {
      type: Number,
      required: false,
    },
    retailPrice: {
      type: Number,
      required: false,
    },
    wholesalePrice: {
      type: Number,
      required: false,
    },
    otherPrice: {
      type: Number,
      required: false,
    },

    tax: {
      type: Number,
      required: false,
    },
    otherTax: {
      type: Number,
      required: false,
    },

    category: {
      type: String,
      required: false,
    }, // phan loai
    quantitative: {
      type: Number,
      required: false,
    }, // Định lượng
    grade: {
      type: String,
      required: false,
    }, // Phẩm cấp
    packingSpecification: {
      type: String,
      required: false,
    },// Quy cách đóng gói,
    origin: {
      type: String,
      required: false,
    },
    dueDate: {
      type: String,
      required: false,
    },
    isPublic: {
      type: String,
      enum: IS_PUBLIC,
      default: IS_PUBLIC.PUBLIC
    },
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
materialsSpareSchema.virtual('no')
  .get(function () { return this.position + 1 });

// COMMODITY_UNIT
// unit, conversionUnit1, conversionUnit2, conversionUnit3
function afterSave(doc: IMaterialsSpareDoc, next: any) {
  hashtagService.createOrUpdate({
    companyId: doc.companyId,
    name: doc.commodityCode,
    target: HASHTAG_TYPES.MATERIALSSPARE_CODE
  }, {})
    .then(() => {
      next()
    })
}
materialsSpareSchema.post("save", afterSave);
materialsSpareSchema.post("findOneAndUpdate", afterSave);
materialsSpareSchema.post("updateOne", afterSave);
materialsSpareSchema.plugin(toJSONPlugin);
materialsSpareSchema.plugin(paginatePlugin);

materialsSpareSchema.index({ companyId: 1, commodityCode: 1 }, { unique: true });

/**
 * @typedef CommodityList
 */
export const MaterialsSpareModel = mongoose.model<IMaterialsSpareDoc, ICommodityListModel>(
  TABLE_CORE_MATERIALS_LIST,
  materialsSpareSchema
);