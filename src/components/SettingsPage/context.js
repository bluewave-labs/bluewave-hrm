import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  fetchCompany as getCompany,
  fetchDepartments as getDepartments,
  fetchDepartmentsPeople as getDepartmentsPeople,
  fetchJobTitles as getJobTitles,
  fetchEmployeesByDepartment as getEmployeesByDepartment,
} from "./api";

const SettingsContext = createContext(undefined);

export const SettingsProvider = ({ children }) => {
  const [company, setCompany] = useState({});
  const [departments, setDepartments] = useState({});
  const [departmentsPeople, setDepartmentsPeople] = useState({});
  const [jobTitles, setJobTitles] = useState({});
  const [employeesByDepartment, setEmployeesByDepartment] = useState({});

  const fetchCompany = async () => {
    const companyData = await getCompany();
    setCompany(companyData);
  };

  const fetchDepartments = async () => {
    const departmentsData = await getDepartments();
    console.log(departmentsData);
    setDepartments(departmentsData);
  };

  const fetchDepartmentsPeople = async () => {
    const departmentsPeopleData = await getDepartmentsPeople();
    setDepartmentsPeople(departmentsPeopleData);
  };

  const fetchJobTitles = async () => {
    const jobTitlesData = await getJobTitles();
    setJobTitles(jobTitlesData);
  };

  const fetchEmployeesByDepartment = async (employeeId) => {
    const employeesByDepartmentData = await getEmployeesByDepartment(employeeId);
    setEmployeesByDepartment(employeesByDepartmentData);
  };

  useEffect(() => {
    fetchCompany();
    fetchDepartments();
    fetchDepartmentsPeople();
    fetchJobTitles();
    fetchEmployeesByDepartment();
  }, []);

  const value = useMemo(
    () => ({
      company,
      departments,
      departmentsPeople,
      jobTitles,
      employeesByDepartment,
      fetchCompany,
      fetchDepartments,
      fetchDepartmentsPeople,
      fetchJobTitles,
      fetchEmployeesByDepartment,
    }),
    [company, departments, departmentsPeople, jobTitles, employeesByDepartment]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
