import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/StaticComponents/Header";
import SideMenu from "../components/StaticComponents/SideMenu";
import PeopleHome from "./PeopleHome";
import Home from "./SampleComponent";
import { Routes, Route } from "react-router-dom";
import BasicModal from "../components/PeopleComponents/PopupModal";
import MyInfoHome from "./MyInfoHome";
import ReportsMain from "../components/reports/ReportsMain"
import { EmployeeProvider } from '../components/myinfo/EmployeeContext';
import ErrorPage from "../../components/Error/ErrorPage";

export default function Dashboard(props) {
  const { email } = props;
  const [user, setUser] = useState();
  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        let res = await axios({
          method: "post",
          url: "http://localhost:5000/api/appusers/find/email",
          data: {
            email: email,
          },
        });
        res = res.data;
        if (!res) {
          return;
        }

        const employee = await axios({
          method: "post",
          url: "http://localhost:5000/api/employees/find/email",
          data: {
            email: email,
          },
        });
        res.employee = employee.data;
        setUser(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const userDetails = {
    avatar:
      user && user.employee
        ? "data:image/png;base64," +
          atob(user.employee.photo.toString("base64"))
        : null,
    name: user ? `${user.firstName} ${user.lastName}` : "Unknown",
    role: user && user.permission ? user.permission.type : "Guest",
  };
  const actions = [
    {
      label: "Log out",
      action: () => {
        console.log("Log out");
      },
    },
  ];
  return (
    <EmployeeProvider>
    <Box>
      <Header user={userDetails} actions={actions} />
      <Stack spacing={15} direction={"row"}>
        <SideMenu />
        <Box>
          <Routes>
            <Route path="/" element={<Home title={"Home page"}/>} />
            <Route path="/myinfo" element={<MyInfoHome employee={user && user.employee} title={"My info page"}/>} />
            <Route path="/people" element={<PeopleHome user={user} />} />
            <Route path="/timeoff" element={<Home title={"Time off page"} />} />
            <Route path="/reporting" element={<ReportsMain title={"Reporting page"} />} /> 
            <Route path="/settings" element={<Home title={"Settings page"} />} />
            <Route path="/support" element={<Home title={"Support page"} />} />
             {/* Catch-all route for undefined paths */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Box>
      </Stack>
    </Box>
    </EmployeeProvider>
  );
}
