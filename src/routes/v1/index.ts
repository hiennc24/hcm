import express from 'express';
import { config } from '../../config';
import { bisoAuth, companyInfo } from '../../middlewares/bisoAuth';
import { salaryConfigMid } from '../../middlewares/salaryConfigMid';
import { allowanceRoute } from './allowance.route';
import { businessCategoryRoute } from './businessCategory.route';
import { companyConfigsRoute } from './companyConfigs.route';
import { departmentRoute } from './department.route';
import docsRoute from './docs.route';
import { dutyRoute } from './duty.route';
import { locationRoute } from './location.route';
import { masterProcessRoute } from './masterProcess.route';
import { productGroupRoute } from './productGroup.route';
import { productCategoryRoute } from './productCategory.route'
import { rcpRoute } from './rcp.route';
import { salaryConfigRoute } from './salaryConfig.route';
import { salaryGradeRoute } from './salaryGrade.route';
import { userRoute } from './user.route';
import { valueChainRoute } from './valueChain.route';
import { variableRoute } from './variable.route';
import { workInSegmentRoute } from './workInSegment.route';
import { materialsSpareRoute } from './MaterialsSpare.route';
import { servicesRoute } from './services.route'
import { commodityListRoute } from './commodityList.route';
import { objectListRoute } from './objectList.route'
import { objectUserRoute } from './objectUser.route'
import { channelRoute } from './channel.route'
import { baseUnitRoute } from './baseUnit.route'
import { bscCategoryRoute } from './bscCategory.route';
import { hashtagBscRoute } from './hashtagBsc.route';
import { classifyBscRoute } from './classifyHashtag.route';
import { periodBscRoute } from './periodHashtag.route';
import { unitBscRoute } from './unitBscHashTag.route';
import { selectListRoute } from './selectList.route';
import { administrationListRoute } from './administrationList.route';
import { mandatesRoute } from './mandates.route';
import { segmentRoute } from './segment.route';
import { cinfigTableRoute } from './configTable.route';
import { salePlanDetailRoute } from './salePlanDetail.route';
import { planSaleRoute } from './planSale.route';
import { bscPlanSplitUpRoute } from './bscPlanSplitUp.route';

const router = express.Router();
router.use(
  '/config',
  bisoAuth,
  salaryConfigRoute
);
router.use(
  '/department',
  bisoAuth,
  departmentRoute
);
router.use(
  '/rcp',
  bisoAuth,
  rcpRoute
);
router.use(
  '/duty',
  bisoAuth,
  dutyRoute
);
router.use(
  '/value-chain',
  bisoAuth,
  valueChainRoute
);
router.use(
  '/work-in-segment',
  bisoAuth,
  workInSegmentRoute
);
router.use(
  '/segment',
  bisoAuth,
  segmentRoute
);
router.use(
  '/masterProcess',
  bisoAuth,
  masterProcessRoute
);
router.use(
  '/mandates',
  bisoAuth,
  mandatesRoute
);

router.use(
  '/salary-grade',
  bisoAuth,
  salaryConfigMid,
  salaryGradeRoute
);
router.use(
  '/allowance',
  bisoAuth,
  salaryConfigMid,
  allowanceRoute
);
router.use(
  '/variable',
  bisoAuth,
  variableRoute
);
router.use(
  '/product-group',
  bisoAuth,
  productGroupRoute
);
router.use(
  '/materials-Spare',
  bisoAuth,
  materialsSpareRoute
);
router.use(
  '/product-category',
  bisoAuth,
  productCategoryRoute
);
router.use(
  '/business-category',
  bisoAuth,
  businessCategoryRoute
);
router.use(
  '/location',
  bisoAuth,
  locationRoute
);
router.use(
  '/company',
  bisoAuth,
  companyInfo,
  companyConfigsRoute
);
router.use(
  '/user',
  bisoAuth,
  userRoute
);
router.use(
  '/services',
  bisoAuth,
  servicesRoute
);
router.use(
  '/commodity-list',
  bisoAuth,
  commodityListRoute
);
router.use(
  '/object-list',
  bisoAuth,
  objectListRoute
);
router.use(
  '/object-user',
  bisoAuth,
  objectUserRoute
);
router.use(
  '/channel',
  bisoAuth,
  channelRoute
);
router.use(
  '/base-unit',
  bisoAuth,
  baseUnitRoute
);
router.use(
  '/category-bsc',
  bisoAuth,
  bscCategoryRoute
);
router.use(
  '/bsc-plan-splitup',
  bisoAuth,
  bscPlanSplitUpRoute
);
router.use(
  '/hashtag-bsc',
  bisoAuth,
  hashtagBscRoute
);
router.use(
  '/classify-hashtag',
  bisoAuth,
  classifyBscRoute
);
router.use(
  '/period-hashtag',
  bisoAuth,
  periodBscRoute
);
router.use(
  '/unit-hashtag',
  bisoAuth,
  unitBscRoute
)
router.use(
  '/select-list',
  bisoAuth,
  selectListRoute
)

router.use(
  '/administration-list',
  bisoAuth,
  administrationListRoute
)
router.use(
  '/table-config',
  bisoAuth,
  cinfigTableRoute
)
router.use(
  '/plan-sale',
  bisoAuth,
  planSaleRoute
)
router.use(
  '/saleplan-detail',
  bisoAuth,
  salePlanDetailRoute
)
const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];
/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;