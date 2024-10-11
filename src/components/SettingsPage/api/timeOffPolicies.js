import axios from "axios";

const getTimeOffs = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/timeoffs`);
    console.log(response.data);
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

const deleteTimeOff = async (timeOffId) => {
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

const getRenewDateMonth = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/timeoffs/renewaldate/get`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching timeoff renew date:", error);
    throw error;
  }
};

const setRenewDateMonth = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/timeoffs/renewaldate/set`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error create new timeoff:", error);
    throw error;
  }
};

export const timeOffPoliciesApi = {
  create: createTimeOff,
  fetch: getTimeOffs,
  update: editTimeOff,
  delete: deleteTimeOff,
  getRenewDateMonth,
  setRenewDateMonth,
};
