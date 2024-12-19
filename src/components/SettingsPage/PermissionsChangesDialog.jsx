import {
  Stack,
  Typography,
  DialogContent,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import HRMButton from "../Button/HRMButton";
import { Dialog, DialogTitle } from "./SettingsDialog/styles";
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
  const updatedPermissions = context?.updatedPermissions;
  const employee = updatedPermissions?.[0]?.employee;
  console.log(updatedPermissions);
  console.log(employee);
  const employeesToManagers = updatedPermissions?.filter(
    (emp) => emp.newPermission === "Manager"
  );
  const managersToEmployees = updatedPermissions?.filter(
    (emp) => emp.newPermission === "Employee"
  );

  const onSubmit = (data) => {
    // if(managersToEmployees)
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between">
        <DialogTitle>
          Select all employees under {`${employee?.firstName} ${employee?.lastName}`}{" "}
        </DialogTitle>
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
        {employeesToManagers.some((emp) => emp.newPermission === "Employee") && updatedPermissions ? (
          <ManagersToEmpSection targetEmployees={managersToEmployees} onSubmit={onSubmit}/>
        ) : (
          <EmpToManagersSection />
        )}
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
