import { useSettingsContext } from "../context";
import { departmentsApi, transferEmployeesDepartment } from "../api";

const successMessage = (action) => `Department ${action}ed successfully`;

const errorMessage = (action) => `Failed to ${action}`;

export const useTimeOffPoliciesData = ({
  onClose,
  setError,
  selectedItem,
  setToast,
  action,
}) => {
  const { departments, fetchDepartmentsPeople, fetchDepartments, employees } =
    useSettingsContext();

  const handleSuccess = (response) => {
    console.log("Data submitted successfully:", response.data);
    if (typeof response === "string" && response?.includes("already exists")) {
      setError("departmentName", {
        message: response,
      });
    } else {
      fetchDepartmentsPeople();
      fetchDepartments();
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
    // departmentsApi.create(data).then(handleSuccess).catch(handleError);
  };

  const editPolicy = (data) => {
    console.log("editPolicy");
    // const departmentById = departments.find(
    //   (item) => item.id === selectedItem.id
    // );

    // if (!departmentById) {
    //   console.error("Department not found!");
    //   return;
    // }

    // const formattedData = {
    //   ...departmentById,
    //   departmentName: data.departmentName,
    // };

    // departmentsApi.update(formattedData).then(handleSuccess).catch(handleError);
  };

  const deletePolicy = () => {
    console.log("editPolicy");
    // departmentsApi
    //   .delete(selectedItem.id)
    //   .then(handleSuccess)
    //   .catch(handleError);
  };

  const transferEmployees = (data) => {
    console.log("transfer");
    deletePolicy();
    // const { departmentDestination } = data;

    // const employeeEmpIds = employees
    //   .filter((employee) => employee.departmentId === selectedItem.id)
    //   .map((employee) => employee.empId);

    // const transferData = {
    //   employeeEmpIds,
    //   destinationDepartmentId: departmentDestination.id,
    // };

    // transferEmployeesDepartment(transferData)
    //   .then((response) => {
    //     console.log("Transfer employess successfully:", response.data);
    //     deleteDepartment();
    //   })
    //   .catch((error) => {
    //     console.error("Transfer employess error:", error);
    //   });
  };

  return {
    add: addPolicy,
    edit: editPolicy,
    delete: transferEmployees,
  };
};
