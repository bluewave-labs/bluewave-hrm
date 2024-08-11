import React from "react";
import EmployeeContext from "../components/myinfo/EmployeeContext";
import MyInfoMain from "../components/myinfo/MyInfoMain";
import MyInfoPersonal from "../components/myinfo/MyInfoPersonal";
import { EmployeeProvider } from "../components/myinfo/EmployeeContext";
import ReportsMain from "../components/reports/ReportsMain";

function MyInfoHome(props) {
  return (
    <EmployeeProvider>
      <MyInfoMain />
    </EmployeeProvider>
  );
}

export default MyInfoHome;
