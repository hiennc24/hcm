import { ConfigTableModel } from "../models";
import { IConfigTableDoc } from "../types";



const get = async (tableKey: string, companyId: string): Promise<IConfigTableDoc | null> => {
    return ConfigTableModel.findOne({
        companyId,
        tableKey,
        deletedById: { $exists: false }
    });
};
const post = async (tableKey: string, body: any, userId: string, companyId: string): Promise<IConfigTableDoc | null> => {
    const { configs } = body;
    return ConfigTableModel.findOneAndUpdate(
        {
            tableKey,
            companyId,
            createdById: userId,
        },
        {
            configs,
        },
        {
            upsert: true, setDefaultsOnInsert: true, new: true
        }
    )
};

const edit = async (companyId: string, tableKey: string, columKey: string, body: any): Promise<IConfigTableDoc | null> => {
    const { length } = body;
    return ConfigTableModel.findOneAndUpdate(
        {
            companyId,
            tableKey,
            "configs": {
                $elemMatch: {
                    "columKey": columKey,
                }
            }

        },
        {
            ...body,
            "configs.$.length": length,
        },
        {
            new: true,
        }
    )
};

export const configTableService = {
    get,
    post,
    edit,
}
