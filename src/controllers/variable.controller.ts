import { TYPES_OF_LABEL } from './../types/enumTypes';
import { Request, Response } from 'express';
import { NATUE_OF_COST_TYPES, PROCESS_TYPES, TYPES_OF_EMPLOYMENT, VARIABLE_CONFIGS } from '../types';
import { catchAsync } from '../utils/catchAsync';

const getVariable = catchAsync(async (req: Request, res: Response) => {
  const getDataConfig = (type: any) => {
    const fTypeObject: any = {
      [VARIABLE_CONFIGS.NATUE_OF_COST_TYPES]: NATUE_OF_COST_TYPES,
      [VARIABLE_CONFIGS.TYPES_OF_EMPLOYMENT]: TYPES_OF_EMPLOYMENT,
      [VARIABLE_CONFIGS.PROCESS_TYPES]: PROCESS_TYPES,
      [VARIABLE_CONFIGS.TYPES_OF_LABEL]: TYPES_OF_LABEL,
    }
    return fTypeObject[type]
  }
  // console.log("getDataConfig(req.query.type)", req.query.type)
  // console.log("getDataConfig(req.query.type)", getDataConfig(req.query.type))
  res.send(Object.keys(
    getDataConfig(req.query.type)
  ).map(key => {
    return {
      name: `LABEL_VARIABLE_${key}`,
      value: key
    }
  }))
});

export const variableController = {
  getVariable,
}
