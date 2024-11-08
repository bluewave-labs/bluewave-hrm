import axios from "axios";
export const fetchEmployees = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/employees");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
