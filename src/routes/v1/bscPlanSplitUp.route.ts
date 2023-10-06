import express from 'express'
import { bscTargetController } from '../../controllers/bscTarget.controller';

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    bscTargetController.getAllSplitUp
  )

export const bscPlanSplitUpRoute = router;
