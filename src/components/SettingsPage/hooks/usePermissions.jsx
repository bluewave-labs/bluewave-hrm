import { useSettingsContext } from "../context";

export const usePermissions = () => {
  const { users, employees } =
    useSettingsContext();

  const mergedUsers = users.map((user) => {
    const employee = employees.find((emp) => emp.empId === user.empId);
    if (employee) {
      return { ...user, ...employee };
    }
    return user;
  });

  return {
    data: mergedUsers,
  };
};
