import axios from "axios";
const BASE_URL = require("./BaseUrl.json").value;

const addCred = {
  withCredentials: true,
};

export const fetchLeavingLetter = async () => {
  try {
    const url = `${BASE_URL}/api/documents/lldoc`;
    const res = await axios.get(url, addCred);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const fetchNDA = () => {
  try {
    const url = `${BASE_URL}/api/documents/nda`;
    const res = axios.get(url, addCred).then((res) => res.data);
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const uploadDocs = async (data, props) => {
  try {
    const url = `${BASE_URL}/api/documents`;
    const res = await axios.post(url, data, { ...props, ...addCred });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const submit = async (data, props) => {
  try {
    const url = `${BASE_URL}/api/offboarding`;
    const res = await axios.post(url, data, { ...props, ...addCred });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const sendEmail = async (data, props, empId) => {
  try {
    const url = `${BASE_URL}/api/offboarding/${empId}/submit`;
    const res = await axios.post(url, data, { ...props, ...addCred });
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};
