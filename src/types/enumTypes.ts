import { TABLE_CORE_PRODUCT_GROUP } from '../config/table';

export enum RequestParams {
  COMPANYID = 'companyId',
  USERID = 'userId',
}

export enum VARIABLE_CONFIGS {
  NATUE_OF_COST_TYPES = "NATUE_OF_COST_TYPES",
  TYPES_OF_EMPLOYMENT = "TYPES_OF_EMPLOYMENT",
  PROCESS_TYPES = "PROCESS_TYPES",
  TYPES_OF_LABEL = "TYPES_OF_LABEL"
}

export enum BASE_FACTOR_TYPES {
  BASE_FACTOR_CENTER = "BASE_FACTOR_CENTER",
  BASE_FACTOR_STARTING = "BASE_FACTOR_STARTING",
}

export enum SALARY_GRADE_TYPES {
  TEMPLATE01 = "TEMPLATE01",
  TEMPLATE02 = "TEMPLATE02",
  TEMPLATE03 = "TEMPLATE03"
}

export enum BASIC_SALARY_TYPES {
  SALARY_BY_REGION = "SALARY_BY_REGION",
  SALARY_BY_STARTING = "SALARY_BY_STARTING",
}

export enum SYSTEM_FIELD_TYPES {
  Text = "Text",
  Peoples = 'Peoples',
  Select = 'Select',
  // 'Date',
  // 'Range_Date',
  // 'Number',
  // 'Range_Number',
  // 'Files',
  // 'Tags',
  // 'Checkbox',
  // 'Progress',
  // 'Assignee',
  // 'Timeline',
  // 'Priority',
  // 'Percentage_Done',
  // 'Status',
  // 'Link',
  // 'Description'
}

export enum FIELD_MODULE {
  PROJ_PROEJCT = "PROJ_PROEJCT"
}

export enum ORGANIZATIONAL_MODAL {
  HORIZONTAL_DIAGRAM = "HORIZONTAL_DIAGRAM",
  FUNCTIONAL_DIAGRAM = "FUNCTIONAL_DIAGRAM",
  MATRIX_DIAGRAM = "MATRIX_DIAGRAM",
  MIXED_DIAGRAM = "MIXED_DIAGRAM",
}

export enum ORGANIZE_TYPES {
  DEPARTMENT = "DEPARTMENT",
  EMPLOYEE_POSITION = "EMPLOYEE_POSITION",
}

export enum TYPES_OF_EMPLOYMENT {
  FULLTIME = "FULLTIME",
  PARTTIME = 'PARTTIME',
  CONCURRENTLY = 'CONCURRENTLY',
}

export enum TYPES_OF_LABEL {
  MERCHANDISE = "MERCHANDISE",
  PRODUCT = 'PRODUCT',
  SERVICE = 'SERVICE',
  MATERIALS = 'MATERIALS',
}

export enum TYPES_OF_FILE {
  PDF = "PDF",
  DOC = 'DOC'
}

export enum TARGET_FORMULA_ALLOWANCE {
  LKD = "LKD",
  LCB = 'LCB',
  KPI = 'KPI',
  LVT = 'LVT'
}
export enum LIST_COLOR {
  AliceBlue = "#F0F8FF",
  Aqua = "#00FFFF",
  Aquamarine = "#7FFFD4",
  CadetBlue = "#5F9EA0",
  Blue = "#0000FF",
  Chartreuse = "#7FFF00",
  Chocolate = "#D2691E",
  Darkorange = "#FF8C00",
  DarkSalmon = "#E9967A",
  Cornsilk = "#FFF8DC",
  Black = "#000000",
  White = "#FFFFFF",
  Yellow = "#FFFF00",
  YellowGreen = "#9ACD32",
  PaleGreen = "	#98FB98",
  Pink = "#FFC0CB"
}
export enum DEPARTMENT_TYPE {
  HDQT = "HDQT",
  BKS = 'BKS',
  BGD = 'BGD',
  PGD = 'PGD'
}
export enum RCP_TYPES {
  COST_OF_FINANCIAL = "COST_OF_FINANCIAL",
  NET_REVENUE = "NET_REVENUE",
  COST_OF_CAPITAL = 'COST_OF_CAPITAL',
  SALES_EXPENSES = "SALES_EXPENSES",
  ADMINISTRATIVE_EXPENSES = "ADMINISTRATIVE_EXPENSES",
}

export enum NATUE_OF_COST_TYPES {
  VARIABLE_COST = "VARIABLE_COST",
  FIEXED_COST = 'FIEXED_COST',
  // MIXED = 'MIXED'
}

export enum PROCESS_TYPES {
  MPROJECT = "MPROJECT",
  MPHASE = 'MPHASE',
  MTASK = 'MTASK',
  MTASK1 = 'MTASK1',
}
export enum IS_PUBLIC {
  PUBLIC = "PUBLIC",
  BLOCK = 'BLOCK'
}
export enum LOCATION_TYPES {
  PROVINCE = 'province',
  DISTRICT = 'district',
  WARD = 'ward',
}

export enum ISURACE_TYPES {
  "socialInsurance" = "socialInsurance",
  "healthInsurance" = "socialInsurance",
  "unemploymentInsurance" = "socialInsurance",
  "accidentInsurance" = "socialInsurance"
}

export enum SURACE_PAY_TYPES {
  "companyPaid" = "companyPaid",
  "employeePaid" = "employeePaid",
}

export enum HASHTAG_TYPES {
  "PRODUCTGROUP_CODE" = "PRODUCTGROUP_CODE",
  "PRODUCTCATEGORY_CODE" = "PRODUCTCATEGORY_CODE",
  "COMMONDITYLIST_CODE" = "COMMONDITYLIST_CODE",
  "SERVICES_CODE" = "SERVICES_CODE",
  "MATERIALSSPARE_CODE" = "MATERIALSSPARE_CODE",
  "OBJECTLIST_CODE" = "OBJECTLIST_CODE",
  "OBJECTUSER_CODE" = "OBJECTUSER_CODE",
  "CHANNEL_CORE" = "CHANNEL_CORE",
  "DETAIL_CORE" = "DETAIL_CORE"
}

export enum BSC_CATEGORY_TYPE {
  CUSTOMER = 'BSC_CUSTOMER_MARKET', //Customers, market share
  FINANCE = 'BSC_FINANCE', //Finance
  OPERATE = 'BSC_ADMINISTRATION_AND_OPERATION', //Administration and Operation
  DEVELOPE = 'BSC_LEARN_AND_DEVELOP', //Learn and develop
}
export enum TITLE_CATEGORY {
  CUSTOMER = 'Khách hàng, thị phần',
  FINANCE = 'Tài chính',
  OPERATE = 'Quản trị, vận hành',
  DEVELOPE = 'Học hỏi phát triển',
}

export enum ICON_CATEGORY {
  CUSTOMER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE3SURBVHgBtZTNjYMwEIXHBo4UsHsFAXcaSAFJAWkgqWYLSBrYApIC0oDPsEFcSQFc+dnnLFmtWHuQI+VJSGjG8/HGjC1oQVEU5Z7nbfEa4rn1fX+q61pxNYJLJklyEELk8/gwDMeqqo62OmlLZFmWm4D3Iil3ugNnaNd178QIYHco1NKTskKDIPgiRvh5V2foOI5s+5iCxBlKC+3DaeMMLcvyCrcnS7rBZChn6D0p5dkUx5x+FkVxs9YRI7hVcHuZhVvf9y9cHQuN43hlOAAhZnjD1RmP6XTeNXBNP2f+n9DB2XYP/ELTNA2xaIV9XBvcNYjvkd8hN3fZ6LsAW6Ie+yw0DMEtih43kVHIbwD9ANQ6n9o9OjxILMz1BcEBoXZy0TBrSG8XeHvJffmPAzW5VbSsN3qFvgFHt3q6DcArBQAAAABJRU5ErkJggg==',
  FINANCE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAERSURBVHgB5ZJBDoIwEEUpYesBdE+BvXs9hweAA3gBPYAHgAu4F4/hHih7PABsAf8QSggWJIaFiZM0nUxnXmd+y7SZZlnWQ/pJkmxVObq2oP0uzFAF5+ijsn/R7Ft9bNt267p2tSU6i+M4AOw6B5YzxgLVQVVVTdxxnDVydh9hSPLoZuyHIShN0wDSrMqyvCC0wcqQ13RojIwg6OYoioQKhPF8ADiBdF33kPeEhnm/s0w6JC6KQ9M0O4GnQG0DgYQ1BxIkXwkxl3N+JH8K1MmDpFuv1Q6EPUThHi5BRKvlKKi9/B2EopMQ4kwP0QrMaRF0DNTUDUcjEOa/ywR6COjn47wgOD52ro0YmwINgMUUiOwF52i6d17gG+IAAAAASUVORK5CYII=',
  OPERATE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG3SURBVHgB7VW7ccJAEF3BDZEpAFIGCWI5twuAAuQCRAE0gAtwAVCAKQAXYOeWU35DKgqAEJDfk+880ozH1s8Zb0bccnfat/tu9yRyxR+w+NPv91uXy2UKsy3VIKzVaqPlcrlX/Hc6nYaYaINkJhUAvnz6hDlTyYXtdpuZoNfreefzWaIo2sOhW6/Xn/F/bFnWI5b9bzIpATgVpVQIkxIfdfQ3yT2pDLrdri8Zweg17vFskInHUcv9MwG1k4qRIliv17dSARzHeTd2qTPIAiX/AFTSSB9+eQIWBs8uKe9qtQqMXYgAPeCziuB4juqxOdfpdNxGoxFifoLynbCLCxMQuuI8yNGMHSk1RS9QnjC1TwoAThYc2cWwHygPxifOgeTFRF8oA2oOGVpwyE4eG2fQfW7btovMPOzhWsCzyJ0BpYHzoY72mFxDRhsMTe5BEG68X3JCyzHSBAMzj+ai4wFIAu4xF2fmu8ikTJsHCUcHOBxDFgdTBzx38vU9+Ui+FxOgAhaM5re7CCkzokDbE5AcQPKKkVK0GTnef4PtoWQXu90ukKLgF5CPyTp596BHXKkSdJjnmq8cn4c5w1RIawNCAAAAAElFTkSuQmCC',
  DEVELOPE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKwSURBVHgBnZZpiE5hGIZvn5ExjH2bMdKEmCQhS6JsSSnZSpZCUYofZMlI1pSyFL8U2WULv76IMD+kGcKUrBlpsqTINiay3o/n/jhzOnPmfHPX1XfOe97teZ/7eWeA7NSOFGUzIJXlt+lkYkR7E2S5QGdynXQItT8VQVmfG6RL1ERNEa0v5B2ZQsrIEDKHjCL9SAn5Sl6TNeQMuR01Ub2hSVPJAlJFbpEHpDnpTkaSnuQkOY4EOkbGBd43kH2ktd43kftktjZmv23IbrIxMG48ORe1gLnjina2jmwjxeSovp0l/eG52UOu6dm0nawkg8ll0gkx6k0u6dkWXKLf1WqbROaRseSA2vLIRS1Q59hzIhZYSxbr+QQphOdiC7lJfpNyeE4s2WXkiSJYiHqSHdQpUkCuaqBNkiZzA31sogukI9xVr0grcj48mUVQpAGmI+Q53JZvyTK4v9/ATZDRfjKQ9IXb1AqwBu62HnDn/e1ndfCLfIIXUAt4YtM6ipnkM9zv4dBtojxFO4jcU7QvyTPNV53SyuXio6J6oU7mhofwAgtrmL6ZnXPh5jB9D8xXE74qqkkvuL+teHbpeCyKVaQlySfrSR9SSg6qT6UWeRScMOiifE38A261nWSRjmw+GQ1P7Dd48W2F56EtWQ5POLSJZjqZf3fRCHghPdYOrEo3q80K7y7pBi8sq4fhZAW80ruqz1ByRxvdC89bVSaCWjKGvNf7NO36ENwAO0gF3JKWJ7ttS7SA3UWW5FmK1mR3ViFiZG6yyizVe4F+J5DTOrrMCdjVYLduWhuoo7jb1L7ZMQ2A3zU/I/rMgDstV0yG2zvRAhmZHe0YDofabWHz/NK4wTloWBX4XxtB2d+CyoYGp5BMtWikkkRgMk+H/5toD7dirJLkwGQXXnGo7QNCVRulPxDmkKHSrLCYAAAAAElFTkSuQmCC'
}

export enum BSC_TARGET_ACTION {
  NONE = 'NONE',
  OGSM = 'OGSM',
  PLAN = 'PLAN'
}
export enum PERIOD_BSC {
  year = 'năm',
  quarterly = 'quý',
  monthly = 'tháng'
}
export enum BSC_ENTIRY_ON_MODEL {
  TABLE_DIVERGENCE = "core_divergence", //Phân kỳ

  TABLE_CORE_PRODUCT_GROUP = "core_product_group", //Nhãn nhóm
  TABLE_CORE_CHANNEL = "core_channel", // kênh tuyến
  TABLE_CORE_BASE_UNIT = "core_base_unit", // đơn vị cơ sở
  TABLE_CORE_DEPARTMENT = "core_department", //phong ban
  TABLE_BUSINESS_SECTOR = "cm_business_sector", //lĩnh vực kinh doanh

  TABLE_BUSINESS = "core_business",
  TABLE_STORE = "core_store",
  TABLE_STAFF = "core_staff",
  TABLE_PROJECT_CONTRACT = "core_project_contract",
  TABLE_FUNCTION = "core_function",
}
export enum SPLITUP_ON_MODEL {
  TABLE_CORE_PRODUCT_GROUP = "core_product_group", //Nhãn nhóm
  TABLE_CORE_CHANNEL = "core_channel", // kênh tuyến
  TABLE_CORE_BASE_UNIT = "core_base_unit", // đơn vị cơ sở
  TABLE_CORE_DEPARTMENT = "core_department", //phong ban
  TABLE_BUSINESS_SECTOR = "cm_business_sector", //lĩnh vực kinh doanh

  TABLE_HASHTAG_BSC = "hashtag_bsc",
}
export enum TABLE_CORE_BSC_TARGETDETAIL_MANAGEBY {
  MANAGEBY_QUANTITY = "MANAGEBY_QUANTITY", //SL
  MANAGEBY_VALUE = "MANAGEBY_VALUE", // gia tri
  MANAGEBY_TIME = "MANAGEBY_TIME",
  MANAGEBY_PERCENT = "MANAGEBY_PERCENT",
  MANAGEBY_PLANNED = "MANAGEBY_PLANNED",
  MANAGEBY_TASK = "MANAGEBY_TASK",
}

export enum MANDATE_KEY {
  R1 = 'R1',
  R2 = 'R2',
  R3 = 'R3',
  A = 'A',
  C = 'C',
  I = 'I'
}

// month
export enum MONTH_KEY {
  "month_1" = "month_1",
  "month_2" = "month_2",
  "month_3" = "month_3",
  "month_4" = "month_4",
  "month_5" = "month_5",
  "month_6" = "month_6",
  "month_7" = "month_7",
  "month_8" = "month_8",
  "month_9" = "month_9",
  "month_10" = "month_10",
  "month_11" = "month_11",
  "month_12" = "month_12",
}
