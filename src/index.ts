import mongoose from 'mongoose';
import app from './app';
import { config } from './config';
import { AdministrationListModel, CompanyModel, CompanyModelDoc, IBscCategoryModel, UserModel } from './models';
import { GlobalUserInfo, ICompanyDoc, ISalaryConfigDoc, ISalaryGradeDoc } from './types';
const logger = require('./config/logger');

export { };
declare global {
  let __basedir: string
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      bearerData: GlobalUserInfo,

      companyId: string,
      companyInfo: CompanyModelDoc,
      userId: string,

      salaryConfigId: string,
      salaryConfig: ISalaryConfigDoc,

      salaryGrade: ISalaryGradeDoc

      departmentId: string

      //BSC
      bscCategory: IBscCategoryModel
      // locationCensor: string, //old
      // file: any,
      // userId: string,
      // book: any,
      // deleteInfo: {
      //   deleteBy: string,
      //   deleteAt: Date
      // },
      // partner: any
    }
  }
}

let server: any;
mongoose.connect(config.mongoose.url, {
  // useNewUrlParser: true, // <-- no longer necessary
  // useUnifiedTopology: true // <-- no longer necessary
}).then(() => {
  logger.info('Connected to MongoDB');

  server = app.listen(config.port, async () => {
    logger.info(`Listening to port ${config.port}`);
  });




  // ((new Array(7)).fill("aaaa")).map((v: string, index: number) => {
  //   CompanyModel.create({
  //     tenancyId: `comp${index}`,
  //     isActive: true,
  //     tenancyName: `comp${index}`,
  //     name: `comp${index}`
  //   }).then((comp: ICompanyDoc) => {
  //     ((new Array(7)).fill("uuuu")).map((uv: string, uindex: number) => {
  //       UserModel.create({
  //         isActive: true,
  //         userId: `userid_${uv}`,
  //         company: comp._id,
  //         name: `Đoàn ${index} ${uindex}`,
  //         surname: "Demo",
  //         userName: `member${index}${uindex}`,
  //         emailAddress: `member${index}${uindex}@gmail.com`,
  //         phoneNumber: `09642251${index}${uindex}`,
  //         profilePictureId: null
  //       })
  //     })
  //   })
  // })


  // ((new Array(1)).fill("aaaa")).map((v: string, index: number) => {
  //   AdministrationListModel.create([
  //     {
  //       companyId: "614054081c8dae2871cddbe0",
  //       position: 0,
  //       key: "DMCP",
  //       name: "Danh mục chi phí",
  //       status: "60",
  //       isSystem: true,
  //       relateModule: "core_category_spending"
  //     },
  //     {
  //       companyId: "614054081c8dae2871cddbe0",
  //       position: 1,
  //       key: "DMDT",
  //       name: "Danh mục dòng tiền",
  //       status: "60",
  //       isSystem: true,
  //       relateModule: "core_category_cash_flow"
  //     }, {
  //       companyId: "614054081c8dae2871cddbe0",
  //       position: 2,
  //       key: "DNPB-BP",
  //       name: "Danh mục phòng ban-Bộ phận",
  //       status: "60",
  //       isSystem: false,
  //       relateModule: "core_department"
  //     }, {
  //       companyId: "614054081c8dae2871cddbe0",
  //       position: 3,
  //       key: "DMDVCS",
  //       name: "Danh mục đơn vị cơ sở",
  //       status: "60",
  //       isSystem: false,
  //       relateModule: ""
  //     }, {
  //       companyId: "614054081c8dae2871cddbe0",
  //       position: 4,
  //       key: "DMKT",
  //       name: "Danh mục kênh tuyến",
  //       status: "60",
  //       isSystem: false,
  //       relateModule: ""
  //     }, {
  //       companyId: "614054081c8dae2871cddbe0",
  //       position: 5,
  //       key: "DMPK",
  //       name: "Danh mục phân kỳ",
  //       status: "60",
  //       isSystem: false,
  //       relateModule: ""
  //     }, {
  //       companyId: "614054081c8dae2871cddbe0",
  //       position: 6,
  //       key: "DMCH",
  //       name: "Danh mục cửa hàng",
  //       status: "60",
  //       isSystem: false,
  //       relateModule: ""
  //     }, {
  //       companyId: "614054081c8dae2871cddbe0",
  //       position: 7,
  //       key: "DMNV",
  //       name: "Danh mục nhân viên",
  //       status: "60",
  //       isSystem: false,
  //       relateModule: ""
  //     }, {
  //       companyId: "614054081c8dae2871cddbe0",
  //       position: 8,
  //       key: "DMHDDA",
  //       name: "Danh mục loại hợp đồng dự án",
  //       status: "60",
  //       isSystem: false,
  //       relateModule: ""
  //     }, {
  //       companyId: "614054081c8dae2871cddbe0",
  //       position: 9,
  //       key: "DMKD",
  //       name: "Danh mục kinh doanh",
  //       status: "60",
  //       isSystem: false,
  //       relateModule: ""
  //     }
  //   ])
  // })


});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
