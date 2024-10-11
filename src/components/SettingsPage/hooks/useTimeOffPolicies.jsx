import { useSettingsContext } from "../context";

const policiesColumns = [
  { header: "Policy type", contentKey: "category" },
  { header: "Default balance (hours)", contentKey: "hours" },
  { header: "Times used", contentKey: "usageCount" },
];

export const useTimeOffPolicies = () => {
  const { timeOffPolicies } = useSettingsContext();

  return {
    data: timeOffPolicies,
    columns: policiesColumns,
  };
}; 
