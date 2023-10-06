import validate from '../../middlewares/validate';

import express from 'express'
import { personnelPositionController } from '../../controllers';
import { personnelPositionValidations } from '../../validations';
import { addDataToBody } from '../../middlewares/addUserToBody';
import { RequestParams } from '../../types';
import { departmentMid } from '../../middlewares/departmentMid';
const router = express.Router({ mergeParams: true });


router
    .route('/all')
    .get(
        validate(personnelPositionValidations.getList),
        personnelPositionController.getAllPosition
    )

export const personnelPositionRoute1 = router;
