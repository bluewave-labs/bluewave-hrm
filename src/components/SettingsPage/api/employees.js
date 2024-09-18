import axios from "axios";
import employees from "./employees.json";

const getEmployees = async () => {
  try {
    // const response = await axios.get("http://localhost:3000/api/employees");
    // return response.data;
    return employees;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const employeesApi = {
  fetch: getEmployees,
};
