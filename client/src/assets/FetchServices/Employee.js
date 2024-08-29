import axios from "axios";
const BASE_URL = require("./BaseUrl.json").value; 

const addCred = {
  withCredentials: true,
};

export const fetchAll = async () => {
  try {
    const url = `${BASE_URL}/api/employees`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchOne = async (empId) => {
  try {
    const url = `${BASE_URL}/api/employees/${empId}`;
    const res = await axios.post(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createOne = async (data) => {
  try {
    const url = `${BASE_URL}/api/employees`;
    const res = await axios.post(url, {inputs: data}, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const update = async (data) => {
  try {
    const url = `${BASE_URL}/api/employees`;
    const res = await axios.put(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const remove = async (empId) => {
  try {
    const url = `${BASE_URL}/api/employees/${empId}`;
    const res = await axios.delete(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchOneByEmail = async (email) => {
  try {
    const url = `${BASE_URL}/api/employees/find/email`;
    const res = await axios.post(url, { email: email }, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchManagers = async () => {
  try {
    const url = `${BASE_URL}/api/managers`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchMyTeam = async (managerId) => {
  try {
    const url = `${BASE_URL}/api/employees/find/myteam`;
    const res = await axios.post(url, { managerId: managerId }, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchSummaryByDepartments = async () => {
  try {
    const url = `${BASE_URL}/api/employees/summaries/departments`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchSummaryByJobTitles = async () => {
  try {
    const url = `${BASE_URL}/api/employees/summaries/jobtitles`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchSummaryByNationalities = async () => {
  try {
    const url = `${BASE_URL}/api/employees/summaries/nationalities`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchSummaryByLocations = async () => {
  try {
    const url = `${BASE_URL}/api/employees/summaries/locations`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchDepartmentChartData = async () => {
  try {
    const url = `${BASE_URL}/api/employees/summaries/departments/chartdata`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchHeadCounts = async (year) => {
  try {
    const url = `${BASE_URL}/api/employees/summaries/headcounts/${year}`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

//Expected data format = { destinationDepartmentId: 2,employeeEmpIds: [1,2,3]}
export const changeDepartments = async (data) => {
  try {
    const url = `${BASE_URL}/api/employees/change/department`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    throw err;
  }
};

//Expected data format = { destinationRoleId: 2, employeeEmpIds: [1,2,3]}
export const changeJobs = async (data) => {
  try {
    const url = `${BASE_URL}/api/employees/change/job`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    throw err;
  }
};
