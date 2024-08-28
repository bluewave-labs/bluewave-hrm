import { useSettingsContext } from "./context";
import { usersApi } from "./api";

const successMessage = () => `Permission updated successfully`;

const errorMessage = () => `Failed to update`;

export const usePermissionData = ({
  onClose,
  setError,
  selectedItem,
  setToast,
  action,
}) => {
  const { users, fetchUsers, fetchEmployees, employees } = useSettingsContext();

  const handleSuccess = (response) => {
    console.log("Data submitted successfully:", response.data);
    fetchUsers();
    fetchEmployees();
    onClose();
    setToast({
      open: true,
      severity: "success",
      message: successMessage(action),
    });
  };

  const handleError = (error) => {
    console.error("Error submitting data:", error);
    onClose();
    setToast({
      open: true,
      severity: "error",
      message: errorMessage(action),
    });
  };

  const updatePermission = (data) => {
    usersApi.update(data).then(handleSuccess).catch(handleError);
  };

  return {
    update: updatePermission,
  };
};
