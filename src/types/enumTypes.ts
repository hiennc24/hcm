export enum SYSTEMFOLDER_TYPES {
  QLKH = 'QUANLY_KEHOACH',
  HDVV = 'HOPDONG_VUVIEC',
  DACD = 'QUANLY_CHIENDICH',
  LPTDA = 'LAP_VA_PHANTICH_DUAN',
  CPL = 'CHUA_PHANLOAI',
}

export enum AUDITLOG_TYPES {
  PROJ_FOLDER_CREATE = "PROJ_FOLDER_CREATE",
  PROJ_FOLDER_RENAME = "PROJ_FOLDER_RENAME",

  PROJ_PROJECT_CREATE = "PROJ_PROJECT_CREATE",
  PROJ_PROJECT_RENAME = "PROJ_PROJECT_RENAME",
}

export enum AUDITLOG_LEVELS {
  PROJ_COMPANY = "company",
  PROJ_FOLDER = "folder",
  PROJ_PROJECT = "project",
}

export enum PERMISSIONS {
  // PROJECT_CREATE = "PROJECT_CREATE",
  PROJECT_EDIT = "PROJECT_EDIT",
  PROJECT_CLOSE = "PROJECT_CLOSE",
  MANAGE_MEMBER = "MANAGE_MEMBER",
  CHANGE_TABVIEW_DEFAULT = "CHANGE_TABVIEW_DEFAULT",

  PHASE_CREATE = "PHASE_CREATE",
  PHASE_EDIT = "PHASE_EDIT",
  PHASE_DELETE = "PHASE_DELETE",

  ISSIE_CREATE = "ISSIE_CREATE",
  ISSIE_EDIT = "ISSIE_EDIT",
  ISSIE_DELETE = "ISSIE_DELETE",
}
