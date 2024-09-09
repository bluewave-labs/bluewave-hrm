import axios from "axios";
import policies from "./policies.json";

function aggregateLeaveData(data) {
  const policies = {};

  Object.keys(data).forEach(employeeId => {
      data[employeeId].forEach(leave => {
          const { type, availableDays, hoursUsed } = leave;

          if (!policies[type]) {
              policies[type] = { type, availableDays: 0, hoursUsed: 0 };
          }

          policies[type].availableDays += availableDays;
          policies[type].hoursUsed += hoursUsed;
      });
  });

  return Object.values(policies);
}

const getTimeOffs = async () => {
  try {
    // const response = await axios.post(
    //   `http://localhost:3000/api/allTimeOffPolicies`
    // );
    // console.log("DATA", aggregateLeaveData(response.data));
    // return aggregateLeaveData(response.data);
    console.log("DATA", aggregateLeaveData(policies));
    return aggregateLeaveData(policies);
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

export const timeOffPoliciesApi = {
  create: createTimeOff,
  fetch: getTimeOffs,
  update: editTimeOff,
  delete: deleteTimeOff,
};
