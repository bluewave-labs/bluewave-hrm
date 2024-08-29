import axios from "axios";
const BASE_URL = require("./BaseUrl.json").value; 

const addCred = {
  withCredentials: true,
};

export const fetchAll = async () => {
  try {
    const url = `${BASE_URL}/api/roles`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchOne = async (roleId) => {
  try {
    const url = `${BASE_URL}/api/roles/${roleId}`;
    const res = await axios.post(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createOne = async (data) => {
  try {
    const url = `${BASE_URL}/api/roles`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const update = async (data) => {
  try {
    const url = `${BASE_URL}/api/roles`;
    const res = await axios.put(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const remove = async (roleId) => {
  try {
    const url = `${BASE_URL}/api/roles/${roleId}`;
    const res = await axios.delete(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const exists = async (roleTitle) => {
    try {
      const url = `${BASE_URL}/api/roles/check/${roleTitle}`;
      const res = await axios.get(url, addCred);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  export const createMany = async (departmentData) => {
    console.log(departmentData);
    try {
      const url = `${BASE_URL}/api/roles/create/bulk`;
      const res = await axios.post(url, { data: departmentData }, addCred);
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };