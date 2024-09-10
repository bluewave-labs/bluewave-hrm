import { Box, Stack } from "@mui/material";
import Header from "../components/StaticComponents/Header";
import SideMenu from "../components/StaticComponents/SideMenu";
import PeopleHome from "./PeopleHome";
import MyInfoHome from "./MyInfoHome";
import ReportsMain from "../components/reports/ReportsMain";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StateContext from "../context/StateContext";
import { produce } from "immer";
import Placeholder from "../components/PeopleComponents/Placeholder";
import UpdatesPage from "../components/UpdatesPage/UpdatesPage";
const api = require("../assets/FetchServices");

const dashboardMenu = {
  home: false,
  myinfo: false,
  people: false,
  timeoff: false,
  reporting: false,
  settings: false,
 };

export default function Dashboard() {
  const stateContext = useContext(StateContext);
  const [current, setCurrent] = useState({});
  const navigate = useNavigate();
  const displayMenu = (menuItem) => {
    const newCurrent = produce(dashboardMenu, (newDashboardMenu) => {
      newDashboardMenu[menuItem] = true;
    });
    setCurrent(newCurrent);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        if (!stateContext.state.user) {
          const currentUser = await api.user.refresh();
          if (currentUser) {
            // Get associated employee record
            const currentEmployee = await api.employee.fetchOneByEmail(
              currentUser.email
            );

            const data = {
              user: currentUser,
              employee: currentEmployee,
            };
            //Set logo =
            try {
              const res = await api.company.fetchLogo();
              const logo = `data:image/png;base64,${atob(res)}`;
              if (logo) {
                data["logo"] = logo;
              }
            } catch (error) {
              console.log("Error, failed to reload logo");
            }
            stateContext.updateStates(data);
            //navigate("/dashboard", { replace: true });
          } else {
            throw "No active session, please log in.";
          }
        }
        const isAdmin =
          stateContext.state.user &&
          stateContext.state.user.permission.id === 1;
        const initialMenu = isAdmin ? "home" : "people";
        displayMenu(initialMenu);
      } catch (err) {
        console.log(err);
        navigate("/", { replace: true }); // Redirect to login page
      }
    }
    fetchData();
  }, []);
  if (!stateContext.state.user) {
    // return <Placeholder content={"Loading, please wait..."} />;
  }
  return (
    <Box>
      <Header />
      <Stack spacing={15} direction={"row"}>
        <SideMenu
          onSelect={(menuItem) => {
            displayMenu(menuItem);
          }}
        />
        <Box>
          {current.home && <UpdatesPage />}
          {current.myinfo && <MyInfoHome />}
          {current.people && <PeopleHome />}
          {current.timeoff && (
            <Placeholder>
              <h1>Time off page</h1>
            </Placeholder>
          )}
          {current.reporting && <ReportsMain />}
          {current.settings && (
            <Placeholder>
              <h1>Settings page</h1>
            </Placeholder>
          )}
        </Box>
      </Stack>
    </Box>
  );
}