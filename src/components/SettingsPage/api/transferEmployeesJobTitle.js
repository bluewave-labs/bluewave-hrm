import axios from "axios";

export const transferEmployeesJobTitle = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/employees/change/job`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error transfer employees:", error);
    throw error;
  }
};
