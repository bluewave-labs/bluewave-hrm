import axios from "axios";

const getJobTitles = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/roles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};

const createJobTitles = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/roles`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error create new role:", error);
    throw error;
  }
};

const editJobTitles = async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/roles`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error to edit role:", error);
    throw error;
  }
};

const deleteJobTitles = async (roleId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/roles/${roleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error delete role:", error);
    throw error;
  }
};

export const jobTitlesApi = {
  create: createJobTitles,
  fetch: getJobTitles,
  update: editJobTitles,
  delete: deleteJobTitles,
}