import { useSettingsContext } from "../context";

const policiesColumns = [
  { header: "Policy type", contentKey: "type" },
  { header: "Default Balance", contentKey: "availableDays" },
  { header: "Times used", contentKey: "hoursUsed" },
];

export const useTimeOffPolicies = () => {
  const { timeOffPolicies } = useSettingsContext();

  return {
    data: timeOffPolicies,
    columns: policiesColumns,
  };
};
