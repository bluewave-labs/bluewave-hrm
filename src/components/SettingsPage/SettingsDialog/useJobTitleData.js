import { useSettingsContext } from "../context";
import { jobTitlesApi, transferEmployeesJobTitle } from "../api";

const successMessage = (action) => `Job title ${action}ed successfully`;

const errorMessage = (action) => `Failed to ${action}`;

export const useJobTitleData = ({
  onClose,
  setError,
  selectedItem,
  setToast,
  action,
}) => {
  const { jobTitles, fetchJobTitlesPeople, fetchJobTitles, employees } =
    useSettingsContext();

  const handleSuccess = (response) => {
    console.log("Data submitted successfully:", response.data);
    if (typeof response === "string" && response?.includes("already exists")) {
      setError("roleTitle", {
        message: response,
      });
    } else {
      fetchJobTitlesPeople();
      fetchJobTitles();
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

  const addJobTitle = (data) => {
    const jobTitleData = {
      roleTitle: data.roleTitle,
      minimumSalary: 0,
      maximumSalary: 0,
    };
    jobTitlesApi.create(jobTitleData).then(handleSuccess).catch(handleError);
  };

  const editJobTitle = (data) => {
    const jobTitleById = jobTitles.find(
      (item) => item.roleId === selectedItem.roleId
    );

    if (!jobTitleById) {
      console.error("Job title not found!");
      return;
    }

    const formattedData = {
      ...jobTitleById,
      roleTitle: data.roleTitle,
    };

    jobTitlesApi.update(formattedData).then(handleSuccess).catch(handleError);
  };

  const deleteJobTitle = () => {
    jobTitlesApi
      .delete(selectedItem.roleId)
      .then(handleSuccess)
      .catch(handleError);
  };

  const transferEmployees = (data) => {
    const { jobTitleDestination } = data;
    const employeeEmpIds = employees
      .filter((employee) => employee.roleId === selectedItem.roleId)
      .map((employee) => employee.empId);

    const transferData = {
      employeeEmpIds,
      destinationRoleId: jobTitleDestination.roleId,
    };

    transferEmployeesJobTitle(transferData)
      .then((response) => {
        console.log("Transfer employess successfully:", response.data);
        deleteJobTitle();
      })
      .catch((error) => {
        console.error("Transfer employess error:", error);
      });
  };

  return {
    add: addJobTitle,
    edit: editJobTitle,
    delete: transferEmployees,
  };
};
