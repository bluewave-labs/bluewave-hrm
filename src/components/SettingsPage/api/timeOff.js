import axios from "axios";

const getTimeOffs = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/timeoffs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching timeoffs:", error);
    throw error;
  }
};

const createTimeOff = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/timeoffs`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error create new timeoff:", error);
    throw error;
  }
};

const editTimeOff = async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/timeoffs`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error edit timeoff:", error);
    throw error;
  }
};

const c = async (timeOffId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/timeoffs/${timeOffId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error delete timeoff:", error);
    throw error;
  }
};


export const timeOffApi = {
  create: getTimeOffs,
  fetch: createTimeOff,
  update: editTimeOff,
  delete: editTimeOff,
}