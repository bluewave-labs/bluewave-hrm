import { useSettingsContext } from "../context";
import { departmentsApi } from "../api";

export const useDepartmentData = () => {
  const { departments } = useSettingsContext();
  const addDepartment = (data) => {
    console.log("addDepartment", data);
    departmentsApi
      .create(data)
      .then((response) => {
        console.log("Add successful:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error adding department:",
          error.response?.data || error.message
        );
      });
  };

  const editDepartment = (selectedItem, data) => {
    const departmentById = departments.find(
      (item) => item.id === selectedItem.id
    );

    if (!departmentById) {
      console.error("Department not found!");
      return;
    }

    const formattedData = {
      ...departmentById,
      departmentName: data.departmentName,
    };

    departmentsApi
      .update(formattedData)
      .then((response) => {
        console.log("Update successful:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error updating department:",
          error.response?.data || error.message
        );
      });
  };

  const deleteDepartment = () => console.log("deleteDepartment");

  return {
    add: addDepartment,
    edit: editDepartment,
    delete: deleteDepartment,
  };
};
