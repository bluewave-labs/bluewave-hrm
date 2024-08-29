import axios from "axios";
export const fetchJobTitles = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/employees/summaries/jobtitles`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching job titles:", error);
    throw error;
  }
};
