import { TABLE_ADMINISTRATION_LIST, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IadministrationListDoc, IS_PUBLIC } from "../types";
import { hashtagService } from "../services/hashtag.service";

mongoose.Promise = require('bluebird');

type IAdministrationListModel = IModel<IadministrationListDoc>

const administrationListSchema = new mongoose.Schema<IadministrationListDoc>(
    {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
        },
        position: {
            type: Number,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        key: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: false,
        },
        isPublic: {
            type: String,
            enum: IS_PUBLIC,
            default: IS_PUBLIC.PUBLIC
        },
        isSystem: {
            type: Boolean,
            require: false,
            default:false
        },
        relateModule: {
            type: String,
            required: false,
        },
        createdById: {
            type: mongoose.Schema.Types.ObjectId,
            ref: TABLE_USER,
            required: false,
        },
        updatedById: {
            type: mongoose.Schema.Types.ObjectId,
            ref: TABLE_USER,
            required: false
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
administrationListSchema.virtual('no')
    .get(function () { return this.position + 1 });


function afterSave(doc: IadministrationListDoc, next: any) {
    hashtagService.createOrUpdate({
        companyId: doc.companyId,
    }, {})
        .then(() => {
            next()
        })
}
administrationListSchema.post("save", afterSave);
administrationListSchema.post("findOneAndUpdate", afterSave);
administrationListSchema.post("updateOne", afterSave);

administrationListSchema.plugin(toJSONPlugin);
administrationListSchema.plugin(paginatePlugin);
administrationListSchema.plugin(toJSONPlugin);

export const AdministrationListModel = mongoose.model<IadministrationListDoc, IAdministrationListModel>(TABLE_ADMINISTRATION_LIST, administrationListSchema);