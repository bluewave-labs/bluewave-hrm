import axios from "axios";
export const fetchDepartments = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/departments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};