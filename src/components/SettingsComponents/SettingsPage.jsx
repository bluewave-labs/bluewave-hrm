import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import Header from "../StaticComponents/Header";
import SideMenu from "../StaticComponents/SideMenu";
import { colors, fonts } from "../../Styles";
import { useState } from "react";
import { styled } from "@mui/system";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CompanyProfileTabContent from "./CompanyProfileTabContent";

export default function SettingsPage({ style }) {
  const [tab, setTab] = useState("Company profile"); //State determining which flag is selected
  const [company, setCompany] = useState({});

  //Function for selecting a new tab
  function handleChange(e, newValue) {
    setTab(newValue);
  }

  //Custom style elements
  const StyledTab = styled(Tab)({
    textTransform: "none",
  });

  const StyledTabPanel = styled(TabPanel)({
    padding: 0,
  });

  return (
    <Box
      sx={{
        ...{
          width: "100%",
          height: "100%",
          color: colors.darkGrey,
          fontFamily: fonts.fontFamily,
        },
        ...style,
      }}
    >
      {/*Header*/}
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          backgroundColor: "#F9FAFB",
        }}
      >
        {/*Side menu*/}
        <Box>
          <SideMenu />
        </Box>
        <Box
          sx={{
            paddingX: "75px",
            paddingY: "40px",
            width: "100%",
            height: "100%",
          }}
        >
          {/*Main page content*/}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              marginBottom: "40px",
            }}
          >
            <h3>Settings</h3>
          </Stack>
          <Box
            sx={{
              ...{
                boxSizing: "border-box",
                minWidth: "980px",
                paddingX: "45px",
                paddingY: "42px",
                border: "1px solid #EBEBEB",
                borderRadius: "5px",
                backgroundColor: "#FFFFFF",
                color: colors.darkGrey,
                fontFamily: fonts.fontFamily,
              },
              ...style,
            }}
          >
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: "#EAECF0" }}>
                <TabList
                  textColor="secondary"
                  indicatorColor="secondary"
                  onChange={handleChange}
                >
                  <StyledTab label="Company profile" value="Company profile" />
                  <StyledTab label="Departments" value="Departments" />
                  <StyledTab label="Job titles" value="Job titles" />
                  <StyledTab label="Time off" value="Time off" />
                  <StyledTab label="Permissions" value="Permissions" />
                  <StyledTab label="Employee fields" value="Employee fields" />
                </TabList>
              </Box>
              {/*Board tab*/}
              <StyledTabPanel value="Company profile">
                <CompanyProfileTabContent company={company} />
              </StyledTabPanel>
              {/*History tab*/}
              <StyledTabPanel value="History">
                {/* <HistoryTabContent timeOffPeriods={timeOffPeriods} /> */}
              </StyledTabPanel>
              {/*Team tab*/}
              <StyledTabPanel value="My team">
                {/* <TeamTabContent timeOffPeriods={timeOffPeriods} /> */}
              </StyledTabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
