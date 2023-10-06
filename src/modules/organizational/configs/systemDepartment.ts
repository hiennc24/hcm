export enum SYSTEM_DEPARTMENT_TYPE {
  DEPARTMENT_DIRECTORATE = "DEPARTMENT_DIRECTORATE",
  DEPARTMENT_GENERAL_ASSEMBLY = "DEPARTMENT_GENERAL_ASSEMBLY", //General Assembly
  DEPARTMENT_CONTROL_BOARD = "DEPARTMENT_CONTROL_BOARD",
  DEPARTMENT_VICE_PRESIDENT = "DEPARTMENT_VICE_PRESIDENT",
}
export enum EDITABLE_SYSTEM_DEPARTMENT_TYPE {
  DEPARTMENT_GENERAL_ASSEMBLY = "DEPARTMENT_GENERAL_ASSEMBLY", //General Assembly
  DEPARTMENT_CONTROL_BOARD = "DEPARTMENT_CONTROL_BOARD",
  DEPARTMENT_VICE_PRESIDENT = "DEPARTMENT_VICE_PRESIDENT",
}

export const getSystemDepartment = (systemType: EDITABLE_SYSTEM_DEPARTMENT_TYPE) => {
  const getDepartment = {
    // [`${SYSTEM_DEPARTMENT_TYPE.DEPARTMENT_DIRECTORATE}`]: {
    //   name: "Ban giám đốc",
    //   isSystem: true,
    //   systemType: SYSTEM_DEPARTMENT_TYPE.DEPARTMENT_DIRECTORATE,
    //   allowDeletion: false,
    // },
    [`${EDITABLE_SYSTEM_DEPARTMENT_TYPE.DEPARTMENT_GENERAL_ASSEMBLY}`]: {
      name: "Hội đồng quản trị",
      isSystem: true,
      systemType: EDITABLE_SYSTEM_DEPARTMENT_TYPE.DEPARTMENT_GENERAL_ASSEMBLY,
      allowDeletion: true,
      systemSort: 0,
    },
    [`${EDITABLE_SYSTEM_DEPARTMENT_TYPE.DEPARTMENT_CONTROL_BOARD}`]: {
      name: "Ban kiểm soát",
      isSystem: true,
      systemType: EDITABLE_SYSTEM_DEPARTMENT_TYPE.DEPARTMENT_CONTROL_BOARD,
      allowDeletion: true,
      systemSort: 1,
    },
    [`${EDITABLE_SYSTEM_DEPARTMENT_TYPE.DEPARTMENT_VICE_PRESIDENT}`]: {
      name: " Phó giám đốc",
      isSystem: true,
      systemType: EDITABLE_SYSTEM_DEPARTMENT_TYPE.DEPARTMENT_VICE_PRESIDENT,
      allowDeletion: true,
      systemSort: 2,
    },
  }
  return getDepartment[systemType]
}
