import { useSettingsContext } from "../context";

const policiesColumns = [
  { header: "Policy type", contentKey: "type" },
  { header: "Default balance", contentKey: "availableDays" },
  { header: "Hours used", contentKey: "hoursUsed" },
];

export const useTimeOffPolicies = () => {
  const { timeOffPolicies } = useSettingsContext();

  return {
    data: timeOffPolicies,
    columns: policiesColumns,
  };
};
