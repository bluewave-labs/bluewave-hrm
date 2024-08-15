import axios from "axios";

const getDepartments = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/departments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

const createDepartment = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/departments`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error create new department:", error);
    throw error;
  }
};

const editDepartment = async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/departments`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error edit department:", error);
    throw error;
  }
};

const deleteDepartment = async (departmentId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/departments/${departmentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error delete department:", error);
    throw error;
  }
};


export const departmentsApi = {
  create: createDepartment,
  fetch: getDepartments,
  update: editDepartment,
  delete: deleteDepartment,
}