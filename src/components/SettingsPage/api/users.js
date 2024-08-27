import axios from "axios";
const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/appusers");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const updateUser = async (data) => {
  try {
    const response = await axios.put(
      "http://localhost:3000/api/appusers",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const usersApi = {
  fetch: getUsers,
  update: updateUser,
};
