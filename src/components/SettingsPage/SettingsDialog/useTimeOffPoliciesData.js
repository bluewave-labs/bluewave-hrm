import { useSettingsContext } from "../context";
import { timeOffPoliciesApi } from "../api";

const successMessage = (action) => `Time off policy ${action}ed successfully`;

const errorMessage = (action) => `Failed to ${action}`;

export const useTimeOffPoliciesData = ({
  onClose,
  setError,
  selectedItem,
  setToast,
  action,
}) => {
  const { fetchTimeOffPolicies } = useSettingsContext();

  const handleSuccess = (response) => {
    console.log("Data submitted successfully:", response.data);
    if (typeof response === "string" && response?.includes("already exists")) {
      setError("departmentName", {
        message: response,
      });
    } else {
      fetchTimeOffPolicies();
      onClose();
      setToast({
        open: true,
        severity: "success",
        message: successMessage(action),
      });
    }
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

  const addPolicy = (data) => {
    console.log("addPolicy");
    timeOffPoliciesApi.create(data).then(handleSuccess).catch(handleError);
  };

  const editPolicy = (data, selectedItem) => {
    const formatedData = {
      ...selectedItem,
      ...data,
      hours: data.hours === "Unlimited" ? null : data.hours,
    };
    timeOffPoliciesApi
      .update(formatedData)
      .then(handleSuccess)
      .catch(handleError);
  };

  const deletePolicy = () => {
    console.log("deletePolicy");
    timeOffPoliciesApi
      .delete(selectedItem.id)
      .then(handleSuccess)
      .catch(handleError);
  };

  return {
    add: addPolicy,
    edit: editPolicy,
    delete: deletePolicy,
  };
};
