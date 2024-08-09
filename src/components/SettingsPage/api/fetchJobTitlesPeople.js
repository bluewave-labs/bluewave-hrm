import axios from "axios";
export const fetchJobTitlesPeople = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/employees/summaries/jobtitles`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching jobtitles:", error);
    throw error;
  }
};