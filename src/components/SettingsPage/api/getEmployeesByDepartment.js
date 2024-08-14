import axios from "axios";

export const getEmployeesByDepartment = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/employees/summaries/departments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};
