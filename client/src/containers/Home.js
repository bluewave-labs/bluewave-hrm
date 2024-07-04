import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/StaticComponents/Header";
import SideMenu from "../components/StaticComponents/SideMenu";
import People from "./People";


import EmployeeForm from "./EmployeeForm";

export default function Home(props) {
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
        if(!res){
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
    name:
      user ? `${user.firstName} ${user.lastName}`
        : "Unknown",
    role: user  && user.permission ? user.permission.type : "Guest",
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
    <Box>
      <Header user={userDetails} actions={actions} />
      <Stack spacing={15} direction={"row"}>
        <SideMenu />
        <EmployeeForm employee={user && user.employee ? user.employee : null} restricted={user && user.permission.id !== 1} />
        <People user={user}/> 
      </Stack>
    </Box>
  );
}
