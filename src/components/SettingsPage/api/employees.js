import { axios } from './axios';
const getEmployees = async () => {
  try {
    const response = await axios.get("employees");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const changeManagerEmployees = async (data) => {
  try {
    const response = await axios.post('employees/manager/change', data);
    return response.data;
  } catch (error) {
    console.error("Error changing manager:", error);
    throw error;
  }
};

export const employeesApi = {
  fetch: getEmployees,
  changeManagerEmployees,
};
