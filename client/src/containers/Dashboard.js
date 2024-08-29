import { Box, Stack } from "@mui/material";
import Header from "../components/StaticComponents/Header";
import SideMenu from "../components/StaticComponents/SideMenu";
import PeopleHome from "./PeopleHome";
import Home from "./SampleComponent";
import MyInfoHome from "./MyInfoHome";
import ReportsMain from "../components/reports/ReportsMain";
import { useContext, useEffect, useState } from "react";
import StateContext from "../components/StateContext";
import { produce } from "immer";
import Placeholder from "../components/PeopleComponents/Placeholder";

const dashboardMenu = {
  home: false,
  myinfo: false,
  people: false,
  timeoff: false,
  reporting: false,
  settings: false,
  support: false,
};

export default function Dashboard() {
  const stateContext = useContext(StateContext);
  const [current, setCurrent] = useState({});

  
  const displayMenu = (menuItem) => {
    const newCurrent = produce(dashboardMenu, (newDashboardMenu) => {
      newDashboardMenu[menuItem] = true;
    });
    setCurrent(newCurrent);
  };
  useEffect(() => {
    const isAdmin = stateContext.state.user && stateContext.state.user.permission.id === 1;
    const initialMenu = isAdmin ? "home" : "people";
    displayMenu(initialMenu);
  }, [stateContext.state.user]);
if (!stateContext.state.user) {

    return (<Placeholder content={"Loading, please wait..."}/>);
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
          {current.home && <Home title={"Home page"} />}
          {current.myinfo && <MyInfoHome />}
          {current.people && <PeopleHome />}
          {current.timeoff && <Home title={"Time off page"} />}
          {current.reporting && <ReportsMain />}
          {current.settings && <Home title={"Settings page"} />}
          {current.support && <Home title={"Support page"} />}
        </Box>
      </Stack>
    </Box>
  );
}
