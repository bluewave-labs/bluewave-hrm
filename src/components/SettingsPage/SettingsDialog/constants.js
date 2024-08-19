import { AddEditDepartment } from "./AddEditDepartment";
import { AddEditJobTitle } from "./AddEditJobTitle";
import { DeleteDepartment } from "./DeleteDepartment";
import { DeleteJobTitle } from "./DeleteJobTitle";

export const tabNames = {
  departments: "departments",
  jobtitles: "jobtitles",
};

export const dialogTitle = {
  add: {
    [tabNames.departments]: "Add a new department",
    [tabNames.jobtitles]: "Add a new job title",
  },
  edit: {
    [tabNames.departments]: "Rename department",
    [tabNames.jobtitles]: "Rename job title",
  },
  delete: {
    [tabNames.departments]: "Where do you want to transfer affected employees?",
    [tabNames.jobtitles]: "Where do you want to transfer affected employees?",
  },
};

export const dialogContent = {
  add: {
    [tabNames.departments]: AddEditDepartment,
    [tabNames.jobtitles]: AddEditJobTitle,
  },
  edit: {
    [tabNames.departments]: AddEditDepartment,
    [tabNames.jobtitles]: AddEditJobTitle,
  },
  delete: {
    [tabNames.departments]: DeleteDepartment,
    [tabNames.jobtitles]: DeleteJobTitle,
  },
};