import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import { colors, fonts } from "../../Styles";
import { useState } from "react";
import { styled } from "@mui/system";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CompanyProfileForm from "./CompanyProfileForm";
import ListTabContent from "./ListTabContent";
import { SettingsProvider } from "./context";
import Page from "../StaticComponents/Page";

const StyledTab = styled(Tab)({
  textTransform: "none",
});

const StyledTabPanel = styled(TabPanel)({
  padding: 0,
});

export default function SettingsPage({ style, innerStyle }) {
  const [tab, setTab] = useState("Company profile");

  function handleChange(e, newValue) {
    setTab(newValue);
  }

  return (
    <SettingsProvider>
      <Page style={style} innerStyle={innerStyle}>
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
              border: "1px solid #EBEBEB",
              borderRadius: "5px",
              backgroundColor: "#FFFFFF",
              color: colors.darkGrey,
              fontFamily: fonts.fontFamily,
              minWidth: "980px",
              paddingX: "45px",
              paddingY: "42px",
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
                <StyledTab label="Offboarding" value="Offboarding" />
              </TabList>
            </Box>
            <StyledTabPanel value="Company profile">
              <CompanyProfileForm />
            </StyledTabPanel>
            <StyledTabPanel value="Departments">
              <ListTabContent content="departments" />
            </StyledTabPanel>
            <StyledTabPanel value="Job titles">
              <ListTabContent content="jobTitles" />
            </StyledTabPanel>
          </TabContext>
        </Box>
      </Page>
    </SettingsProvider>
  );
}
