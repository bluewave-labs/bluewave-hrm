import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  companyApi,
  departmentsApi,
  jobTitlesApi,
  employeesApi,
  usersApi,
  getEmployeesByDepartment,
  getEmployeesByJobTitle,
} from "./api";

const SettingsContext = createContext(undefined);

export const SettingsProvider = ({ children }) => {
  const [company, setCompany] = useState({});
  const [departments, setDepartments] = useState([]);
  const [departmentsPeople, setDepartmentsPeople] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [jobTitlesPeople, setJobTitlesPeople] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [updatedPermissions, setUpdatedPermissions] = useState([]);

  const fetchCompany = async () => {
    const companyData = await companyApi.fetch();
    setCompany(companyData);
  };

  const fetchUsers = async () => {
    const usersData = await usersApi.fetch();
    setUsers(usersData);
  };

  const fetchEmployees = async () => {
    const employees = await employeesApi.fetch();
    setEmployees(employees);
  };

  const fetchDepartments = async () => {
    const departmentsData = await departmentsApi.fetch();
    setDepartments(departmentsData);
  };

  const fetchDepartmentsPeople = async () => {
    const departmentsPeopleData = await getEmployeesByDepartment();
    setDepartmentsPeople(
      departmentsPeopleData.sort((a, b) =>
        a.departmentName.localeCompare(b.departmentName)
      )
    );
  };

  const fetchJobTitles = async () => {
    const jobTitlesData = await jobTitlesApi.fetch();
    setJobTitles(jobTitlesData);
  };

  const fetchJobTitlesPeople = async () => {
    const jobTitlesPeopleData = await getEmployeesByJobTitle();
    setJobTitlesPeople(
      jobTitlesPeopleData.sort((a, b) => a.roleTitle.localeCompare(b.roleTitle))
    );
  };

  useEffect(() => {
    fetchCompany();
    fetchDepartments();
    fetchDepartmentsPeople();
    fetchJobTitles();
    fetchJobTitlesPeople();
    fetchEmployees();
    fetchUsers();
  }, []);

  const value = useMemo(
    () => ({
      company,
      departments,
      departmentsPeople,
      jobTitles,
      jobTitlesPeople,
      employees,
      users,
      updatedPermissions,
      setUpdatedPermissions,
      fetchCompany,
      fetchDepartments,
      fetchDepartmentsPeople,
      fetchJobTitles,
      fetchJobTitlesPeople,
      fetchEmployees,
      fetchUsers,
    }),
    [
      company,
      departments,
      departmentsPeople,
      jobTitles,
      jobTitlesPeople,
      employees,
      users,
      updatedPermissions,
    ]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
