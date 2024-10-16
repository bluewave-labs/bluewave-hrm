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

const deleteTimeOffInitiate = async (data) => {
  console.log("deleteTimeOffInitiate");
  const { timeOffId, newTimeOffId } = data;
  console.log({ timeOffId: data.timeOffId });
  try {
    const response = await axios.post(
      `http://localhost:3000/api/timeoffs/deletion/initiate`,
      { timeOffId: timeOffId }
    );
    const { message } = response.data;
    const { timeOffId: oldTimeOffId, ...changedMessage } = message;

    console.log("return API response");
    const deleteData = {
      ...changedMessage,
      oldTimeOffId,
      newTimeOffId,
    };
    console.log(deleteData);
    deleteTimeOffConfirm(deleteData);
  } catch (error) {
    console.error("Error delete timeoff:", error);
    throw error;
  }
};

const deleteTimeOffConfirm = async (data) => {
  console.log("data deleteTimeOffConfirm");
  console.log(data);
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/timeoffs/deletion/confirm/ `,
      data
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
  delete: deleteTimeOffInitiate,
  getRenewDateMonth,
  setRenewDateMonth,
};
