import { useMemo } from "react";
import { useSettingsContext } from "../context";

export const usePermissions = () => {
  const { users, employees } = useSettingsContext();

  const mergedUsers = useMemo(() => {
    if (employees.length === 0 || users.length === 0) return [];

    return users.map((user) => {
      const employee = employees.find((emp) => emp.empId === user.empId);
      return { ...user, ...employee };
    });
  }, [users, employees]);

  return {
    data: mergedUsers,
  };
};
