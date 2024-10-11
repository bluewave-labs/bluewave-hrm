import axios from "axios";

const companyId = 1;
export const fetchCompany = async () => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/company/${companyId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching company:", error);
    throw error;
  }
};