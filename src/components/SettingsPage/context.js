import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  fetchCompany as getCompany,
  fetchDepartments as getDepartments,
  fetchDepartmentsPeople as getDepartmentsPeople,
  fetchJobTitles as getJobTitles,
} from "./api";

const SettingsContext = createContext(undefined);

export const SettingsProvider = ({ children }) => {
  const [company, setCompany] = useState({});
  const [departments, setDepartments] = useState({});
  const [departmentsPeople, setDepartmentsPeople] = useState({});
  const [jobTitles, setJobTitles] = useState({});

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

  useEffect(() => {
    fetchCompany();
    fetchDepartments();
    fetchDepartmentsPeople();
    fetchJobTitles();
  }, []);

  const value = useMemo(
    () => ({
      company,
      departments,
      departmentsPeople,
      jobTitles,
      fetchCompany,
      fetchDepartments,
      fetchDepartmentsPeople,
      fetchJobTitles,
    }),
    [company, departments, departmentsPeople, jobTitles]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
