import { PlanSaleModel } from "../models/planSale.model";
import { IPlanSaleDoc } from "../types";

const create = async (body: any): Promise<IPlanSaleDoc | null> => {
    return PlanSaleModel.create(body);
  };

const getAll = async (): Promise<IPlanSaleDoc[]> => {
    return PlanSaleModel.find({
        deletedById: { $exists: false }
    }).sort({ updatedAt: 1 });
};

const getById = async (planSaleId: string): Promise<IPlanSaleDoc | null> => {
    return PlanSaleModel.findOne({
        _id: planSaleId,
        deletedById: { $exists: false }
    });
};

const updateOne = async (planSaleId: string, body: any): Promise<IPlanSaleDoc | null> => {
    console.log("bodybody", body)
    return PlanSaleModel.findOneAndUpdate(
        {
            _id: planSaleId,
            deletedById: { $exists: false }
        }, body, { new: true });
};


export const palnSaleService = {
    getById,
    create,
    updateOne,
    getAll
}
