import { useSettingsContext } from "../context";

const jobTitlesColumns = [
  { header: "Name", contentKey: "roleTitle" },
  { header: "People", contentKey: "count" },
];

export const useJobTitlesPeople = () => {
  const { jobTitlesPeople } = useSettingsContext();

  return {
    data: jobTitlesPeople,
    columns: jobTitlesColumns,
  };
};
