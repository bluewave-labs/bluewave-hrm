import { useSettingsContext } from "../context";

const policiesColumns = [
  { header: "Policy type", contentKey: "departmentName" },
  { header: "Default Balance", contentKey: "count" },
  { header: "Times used", contentKey: "count" },
];

export const useTimeOffPolicies = () => {
  const { departmentsPeople } = useSettingsContext();

  return {
    data: departmentsPeople,
    columns: policiesColumns,
  };
};
