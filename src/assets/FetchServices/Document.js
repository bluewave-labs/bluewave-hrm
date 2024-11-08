import axios from "axios";
const BASE_URL = require("./BaseUrl.json").value; 
<<<<<<< HEAD

const addCred = {
  withCredentials: true,
};
=======
const addCred = require("./withCredentials.json");

>>>>>>> 916e7549067db2af140026a3ca1630bd1d71983c
export const fetchAll = async () => {
  try {
    const url = `${BASE_URL}/api/documents`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchOne = async (id) => {
  try {
    const url = `${BASE_URL}/api/documents/${id}`;
    const res = await axios.post(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createOne = async (data) => {
  try {
    const url = `${BASE_URL}/api/documents`;
    const res = await axios.post(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const update = async (data) => {
  try {
    const url = `${BASE_URL}/api/documents`;
    const res = await axios.put(url, data, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const remove = async (id) => {
  try {
    const url = `${BASE_URL}/api/documents/${id}`;
    const res = await axios.delete(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createMany = async (data) => {
    try {
      const url = `${BASE_URL}/api/documents/create/bulk`;
      const res = await axios.post(url, { data: data }, addCred);
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
