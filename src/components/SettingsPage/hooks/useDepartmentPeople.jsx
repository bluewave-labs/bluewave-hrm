import { useSettingsContext } from "../context";

const departmentColumns = [
  { header: "Name", contentKey: "departmentName" },
  { header: "People", contentKey: "count" },
];

export const useDepartmentPeople = () => {
  const { departmentsPeople } = useSettingsContext();

  return {
    data: departmentsPeople,
    columns: departmentColumns,
  };
};
