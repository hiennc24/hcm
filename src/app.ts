const xss = require('xss-clean');
const cors = require('cors')
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
// const passport = require('passport');
import httpStatus from 'http-status';
import morgan from './config/morgan';
// const { jwtStrategy } = require('./config/passport');
import routes from './routes/v1';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';
import { config } from './config';
import { authLimiter } from './middlewares/rateLimiter';
import { AccountabilityModel, BscCategoryModel, DepartmentModel, UserModel } from './models';
import { getSystemDepartment, SYSTEM_DEPARTMENT_TYPE } from './modules';
import { BSC_CATEGORY_TYPE, ICON_CATEGORY, MONTH_KEY, TITLE_CATEGORY } from './types';
import { DivergenceModel } from './models/divergence.model';
// import { LocationModel, SalaryConfigModel, SalaryGradeModel, SalaryLevelModel } from './models';
// import { LOCATION_TYPES, SALARY_GRADE_TYPES } from './types';
// import { BusinessCategoryModel } from './models/businessCategory.model';
// import { BusinessSectorModel } from './models/businessSector.model';

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());
// Add headers before the routes are defined
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//   res.setHeader('Access-Control-Allow-Origin', 'https://vdiarybook.vn');
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   // Pass to next layer of middleware
//   next();
// });
// jwt authentication
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/core/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// Promise.all([
//   BscCategoryModel.create({
//     companyId: "614054081c8dae2871cddbe0",
//     bscCategoryKey: BSC_CATEGORY_TYPE.CUSTOMER,
//     icon: ICON_CATEGORY.CUSTOMER,
//     backgroundColor: '#EAF5F9',
//     title: TITLE_CATEGORY.CUSTOMER,
//     description: 'Tăng qui mô kinh doanh, ổn định hoạt động bán hàng tiêu chuẩn',
//     position: 1,
//   }),
//   BscCategoryModel.create({
//     companyId: "614054081c8dae2871cddbe0",
//     bscCategoryKey: BSC_CATEGORY_TYPE.FINANCE,
//     icon: ICON_CATEGORY.FINANCE,
//     backgroundColor: '#FFF6E5',
//     title: TITLE_CATEGORY.FINANCE,
//     description: 'Ổn định doanh thu, tăng tỷ suất bán hàng',
//     position: 2,
//   }),
//   BscCategoryModel.create({
//     companyId: "614054081c8dae2871cddbe0",
//     bscCategoryKey: BSC_CATEGORY_TYPE.OPERATE,
//     icon: ICON_CATEGORY.OPERATE,
//     backgroundColor: '#F3F4F6',
//     title: TITLE_CATEGORY.OPERATE,
//     description: 'Quản trị vận hành tinh gọn, tăng tốc độ xử lý công việc',
//     position: 3,
//   }),
//   BscCategoryModel.create({
//     companyId: "614054081c8dae2871cddbe0",
//     bscCategoryKey: BSC_CATEGORY_TYPE.DEVELOPE,
//     icon: ICON_CATEGORY.DEVELOPE,
//     backgroundColor: '#E6FAED',
//     title: TITLE_CATEGORY.DEVELOPE,
//     description: 'Cải tiến sản phẩm và chất lượng dịch vụ, nâng cao trình độ nhân viên',
//     position: 4,
//   })
// ])

// Object.values(MONTH_KEY).forEach(mKey => {
//   DivergenceModel.create({
//     companyId: "614054081c8dae2871cddbe0",
//     divergenceKey: mKey,
//     name: `LABEL_${mKey}`
//   }).then(() => {
//     console.log("sssss")
//   })
// })

// AccountabilityModel.updateMany({}, {
//   $unset: { mandates: 1 }
// }).exec()
// DepartmentModel.create({
//   companyId: "614054081c8dae2871cddbe0", //2
//   createdById: "61449fa61147b4098b8ac45c",
//   ...getSystemDepartment(SYSTEM_DEPARTMENT_TYPE.DEPARTMENT_DIRECTORATE)
// })
// DepartmentModel.updateMany({
//   _id: { $ne: "629071e290e7175d21e2fbd9" }
// }, {
//   isSystem: false
// }).exec()

// (new Array(30)).fill(null).forEach((v, i) => {
//   UserModel.create({
//     userId: 100 + i,//1
//     company: "614054081c8dae2871cddbe0", //2
//     name: "fake",//admin,
//     surname: `demo ${i}`,//admin,
//     userName: `fakedemo${i}`,//admin,
//     emailAddress: `fakedemo${i}@gmail.com`,//admin@aspnetzero.com,
//     phoneNumber: `0${984225162 + i}`,//null,
//     profilePictureId: null,//null,
//     isActive: true,//true,
//     creationTime: new Date(),//2021-07-24T17:53:09.752915,
//   })
// })

// const items = [10000000, 15000000, 12000000, 18000000, 20000000, 30000000]
// Location.find({
//   type: LOCATION_TYPES.DISTRICT
// }).then(ditstrics => {
//   ditstrics.forEach(dst => {
//     dst.minWage = items[Math.floor(Math.random() * items.length)]
//     dst.save()
//   })
// })
// new Array(10).fill(null).forEach((v1, i1) => {
//   BusinessCategoryModel.create({
//     name: `Business Category ${i1}`
//   }).then((b) => {
//     new Array(Math.floor(Math.random() * 8) + 3).fill(null).forEach((v2, i2) => {
//       BusinessSectorModel.create({
//         name: `Ngành nghề  ${i1} ${i2}`,
//         businessCategoryId: b._id
//       })
//     })
//   })
// })
// SalaryGradeModel.updateMany({
//   percentLcb: 70,
//   percentKpi: 30
// }).exec()

// SalaryConfigModel.find({}).populate("grades")
//   .then(cfs => {
//     // console.log("cfs", cfs)
//     cfs.forEach((cf: any) => {
//       console.log("cf", cf)

//       Promise.all(cf.grades.map((grade: any) => {

//         return Promise.all([
//           new Promise((resolve: any) => {
//             if (cf.salaryGradeType == SALARY_GRADE_TYPES.TEMPLATE03) {
//               grade.percentLcb = 70;
//               grade.percentKpi = 30;
//               grade.save().then(() => resolve());
//             } else {
//               SalaryGradeModel.findByIdAndUpdate(
//                 grade.id, { $unset: { percentLcb: "", percentKpi: "" } }
//               ).then(() => resolve());
//             }
//           }),
//           SalaryLevelModel.updateMany(
//             {
//               salaryGradeId: grade.id
//             },
//             {
//               percentLcb: 70,
//               percentKpi: 30
//             }
//           )
//         ])

//       }))
//         .then(() => console.log("done eeeee"))

//     })
//   })

export default app;
