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
import ManagePermissions from "./ManagePermissions";
import Page from "../StaticComponents/Page";
import {
  useDepartmentPeople,
  useJobTitlesPeople,
  useTimeOffPolicies,
  usePermissions,
} from "./hooks";
import { tabNames } from "./SettingsDialog";

const StyledTab = styled(Tab)({
  textTransform: "none",
});

const StyledTabPanel = styled(TabPanel)({
  padding: 0,
});

export default function SettingsPage({ style, innerStyle }) {
  const [tab, setTab] = useState("Company profile");
  const { data: departmentsPeopleData, columns: departmentsPeopleColumns } =
    useDepartmentPeople();
  const { data: jobTitlesPeopleData, columns: jobTitlesPeopleColumns } =
    useJobTitlesPeople();

  const { data: timeoffPoliciesData, columns: timeOffPoliciesColumns } =
    useTimeOffPolicies();

  const { data: permissionsData } = usePermissions();

  console.log("permissionsData", permissionsData);

  function handleChange(e, newValue) {
    setTab(newValue);
  }

  return (
    <Page style={style} innerStyle={innerStyle}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          marginBottom: "10px",
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
            <ListTabContent
              contentList={departmentsPeopleData}
              titleTabPage="Departments"
              columns={departmentsPeopleColumns}
              tabName={tabNames.departments}
            />
          </StyledTabPanel>
          <StyledTabPanel value="Job titles">
            <ListTabContent
              contentList={jobTitlesPeopleData}
              titleTabPage="Job Title"
              columns={jobTitlesPeopleColumns}
              tabName={tabNames.jobtitles}
            />
          </StyledTabPanel>
          <StyledTabPanel value="Time off">
            <ListTabContent
              contentList={timeoffPoliciesData}
              titleTabPage="Time off policies"
              columns={timeOffPoliciesColumns}
              tabName={tabNames.timeoffs}
            />
          </StyledTabPanel>
          <StyledTabPanel value="Permissions">
            <ManagePermissions
              contentList={permissionsData}
              titleTabPage="Permissions"
              tabName={tabNames.permissions}
            />
          </StyledTabPanel>
        </TabContext>
      </Box>
    </Page>
  );
}
