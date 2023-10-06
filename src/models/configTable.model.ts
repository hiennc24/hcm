import { TABLE_CONFIGS_TABLE, TABLE_SALARY_CONFIG, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IConfigTableDoc } from "../types";
mongoose.Promise = require('bluebird');

type IConfigTableModel = IModel<IConfigTableDoc>

const configTableSchema = new mongoose.Schema<IConfigTableDoc>(
    {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
        },
        tableKey: {
            type: String,
            required: true,
        },
        configs: [{
            columKey: {
                type: String,
                required: true,
            },
            length: {
                type: Number,
                require: true,
            }
        }],

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

configTableSchema.plugin(toJSONPlugin);
configTableSchema.plugin(paginatePlugin);

/**
 * @typedef ConfigTable
 */
export const ConfigTableModel = mongoose.model<IConfigTableDoc, IConfigTableModel>(TABLE_CONFIGS_TABLE, configTableSchema);