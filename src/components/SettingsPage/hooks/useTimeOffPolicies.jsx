import { useSettingsContext } from "../context";

const policiesColumns = [
  { header: "Policy type", contentKey: "category" },
  { header: "Default balance", contentKey: "hours" },
  { header: "Hours used", contentKey: "usageCount" },
];

export const useTimeOffPolicies = () => {
  const { timeOffPolicies } = useSettingsContext();

  return {
    data: timeOffPolicies,
    columns: policiesColumns,
  };
}; 
