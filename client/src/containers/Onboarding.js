import { Box } from "@mui/material";
import React from "react";
import SetupCompanyMenu from "../components/SetupCompanyMenu/SetupCompanyMenu";
import SetupDepartment from "../components/SetupCompanyMenu/SetupDepartmentsMenu";
import SuccessMenu from "../components/SetupCompanyMenu/SuccessMenu";
import SetupRolesMenu from "../components/SetupCompanyMenu/SetupRolesMenu";
import SingupPage from "../components/LoginComponents/SingupPage";
import Progress from "../components/Progress/Progress";
function Onboarding() {
  return (
    <Box>
        <Progress />
      <SingupPage />
      <SetupCompanyMenu />
      <SetupDepartment />
      <SetupRolesMenu />
      <SuccessMenu />
    </Box>
  );
}

export default Onboarding;
