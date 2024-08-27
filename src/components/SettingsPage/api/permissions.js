import axios from "axios";

const getUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/departments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

const editPermision = async (data) => {
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


export const departmentsApi = {
  fetch: getUsers,
  update: editPermision,
}