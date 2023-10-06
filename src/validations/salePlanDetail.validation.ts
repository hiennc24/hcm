import Joi from 'joi';
import { TABLE_CORE_PRODUCT_CATEGORY, TABLE_CORE_PRODUCT_GROUP } from '../config/table';
import { customValidations } from './custom.validation';

const create = {
    body: Joi.object().keys({
        salePlanId: Joi.string().custom(customValidations.objectId).required(),
        salePlanModel: Joi.string()
            .valid(...Object.values([TABLE_CORE_PRODUCT_GROUP, TABLE_CORE_PRODUCT_CATEGORY])),

        ...customValidations.createEntityValidation
    }),
};

// const updateOne = {
//     params: Joi.object().keys({
//         salePlanDetailId: Joi.string().custom(customValidations.objectId).required(),
//     }),
//     body: Joi.object().keys({
//         productId: Joi.string(),
//         type: Joi.string(),
//         unit: Joi.string(),

//         ...customValidations.updateEntityValidation
//     }),
// };
// const getAll = {
//     query: Joi.object().keys({
//         planSaleId: Joi.string().custom(customValidations.objectId),
//         type: Joi.string()
//     }),
// };
const deleteOne = {
    params: Joi.object().keys({
        salePlanDetailId: Joi.string().custom(customValidations.objectId).required(),
    })
};
const getdetail = {
    params: Joi.object().keys({
        salePlanDetailId: Joi.string().custom(customValidations.objectId).required(),
    })
}
export const salePlanDetailValidations = {
    // getAll,
    create,
    // updateOne,
    deleteOne,
    getdetail,
}
