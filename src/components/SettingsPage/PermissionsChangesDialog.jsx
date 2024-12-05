import { useState } from "react";
import {
  Stack,
  Typography,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Badge,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import HRMButton from "../Button/HRMButton";
import { Dialog, DialogTitle } from "./SettingsDialog/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSettingsContext } from "./context";
import ManagersToEmpSection from "./ManagersToEmpSection";
import EmpToManagersSection from "./EmpToManagersSection";

const TextHeader = styled(Typography)({
  fontFamily: "Inter",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "18px",
  color: "#475467",
});

const Text = styled(Typography)({
  fontFamily: "Inter",
  lineHeight: "20px",
  fontWeight: "400",
  color: "#475467",
  fontSize: "13px",
});

export default function PermissionsChangesDialog({ open, onClose }) {
  const context = useSettingsContext();
  const employees = context?.employees;
  const updatedPermissions = context?.updatedPermissions;
  const employeesToManagers = updatedPermissions?.filter(
    (emp) => emp.newPermission === "Manager"
  );
  const managersToEmployees = updatedPermissions?.filter(
    (emp) => emp.newPermission === "Employee"
  );

  function TabPanel({ children, value, index, ...other }) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
      </div>
    );
  }

  const onSubmit = (data) => {
    // if(managersToEmployees)
  };

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between">
        <DialogTitle>Select all employees under each manager</DialogTitle>
        <CloseIcon
          onClick={onClose}
          sx={{
            width: "20px",
            height: "20px",
            backgroundColor: "#FFFFFFF",
            color: "#98A2B3",
            textAlign: "right",
            padding: "16px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      </Stack>
      <DialogContent>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="employee manager tabs"
        >
          <Tab
            label={
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Typography sx={{fontSize: "14px"}}>Employee → Manager</Typography>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#7f56d9",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  {employeesToManagers.length}
                </Stack>
              </Stack>
            }
          />
          <Tab
            label={
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Typography sx={{fontSize: "14px"}}>Manager → Employee</Typography>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#7f56d9",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  {managersToEmployees.length}
                </Stack>
              </Stack>
            }
          />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <EmpToManagersSection targetEmployees={employeesToManagers} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ManagersToEmpSection targetEmployees={managersToEmployees} />
        </TabPanel>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
          sx={{ marginTop: "50px" }}
        >
          <HRMButton mode="secondaryB" onClick={onClose} color="primary">
            Cancel
          </HRMButton>
          <HRMButton mode="primary" onClick={onSubmit}>
            Save
          </HRMButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
