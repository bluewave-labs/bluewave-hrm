import axios from "axios";
export const fetchEmployeesByDepartment = async (departmentId) => {
  console.log("fetchEmployeesByDepartment ", departmentId);
  try {
    const response = await axios.get("http://localhost:3000/api/employees");
    const allEmployees = response.data;
    const filteredEmployees = allEmployees.filter(
      (employee) => employee.departmentId === departmentId
    );
    console.log(filteredEmployees);
    return filteredEmployees;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
