import { useSettingsContext } from "../context";

const permissionsColumns = [
  { header: "Name", contentKey: "departmentName" },
  { header: "Role", contentKey: "count" },
  { header: "Team", contentKey: "count" },
  { header: "Admin", contentKey: "count" },
  { header: "Manager", contentKey: "count" },
  { header: "Employee", contentKey: "count" },
];

export const usePermissions = () => {
  const { departmentsPeople } = useSettingsContext();

  return {
    data: departmentsPeople,
    columns: permissionsColumns,
  };
};