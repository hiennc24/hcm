import paginate from 'mongoose-paginate-v2'
import aggregatePaginate from "mongoose-aggregate-paginate-v2"
import { toJSON } from './toJSON.plugin';
import mongoose from 'mongoose';
const deepPopulate = require('mongoose-deep-populate')(mongoose);

export const paginatePlugin = paginate;
export const aggregatePaginatePlugin = aggregatePaginate;
export const toJSONPlugin = toJSON;
export const deepPopulatePlugin = deepPopulate;