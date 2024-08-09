import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  fetchCompany as getCompany,
  fetchDepartments as getDepartments,
  fetchDepartmentsPeople as getDepartmentsPeople,
  fetchJobTitlesPeople as getJobTitlesPeople,
  fetchJobTitles as getJobTitles,
  fetchEmployees as getEmployees,
} from "./api";

const SettingsContext = createContext(undefined);

export const SettingsProvider = ({ children }) => {
  const [company, setCompany] = useState({});
  const [departments, setDepartments] = useState({});
  const [departmentsPeople, setDepartmentsPeople] = useState({});
  const [jobTitles, setJobTitles] = useState({});
  const [jobTitlesPeople, setJobTitlesPeople] = useState({});
  const [employees, setEmployees] = useState({});

  const fetchCompany = async () => {
    const companyData = await getCompany();
    setCompany(companyData);
  };

  const fetchDepartments = async () => {
    const departmentsData = await getDepartments();
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

  const fetchJobTitlesPeople = async () => {
    const jobTitlesPeopleData = await getJobTitlesPeople();
    setJobTitlesPeople(jobTitlesPeopleData);
  };

  const fetchEmployees = async () => {
    const employees = await getEmployees();
    setEmployees(employees);
  };

  useEffect(() => {
    fetchCompany();
    fetchDepartments();
    fetchDepartmentsPeople();
    fetchJobTitles();
    fetchJobTitlesPeople();
    fetchEmployees();
  }, []);

  const value = useMemo(
    () => ({
      company,
      departments,
      departmentsPeople,
      jobTitles,
      jobTitlesPeople,
      employees,
      fetchCompany,
      fetchDepartments,
      fetchDepartmentsPeople,
      fetchJobTitles,
      fetchJobTitlesPeople,
      fetchEmployees,
    }),
    [company, departments, departmentsPeople, jobTitles, jobTitlesPeople, employees]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
