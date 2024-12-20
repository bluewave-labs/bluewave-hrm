import { Stack, Typography, DialogContent } from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import HRMButton from "../Button/HRMButton";
import { Dialog, DialogTitle } from "./SettingsDialog/styles";
import { useSettingsContext } from "./context";
import ManagersToEmpSection from "./ManagersToEmpSection";
import EmpToManagersSection from "./EmpToManagersSection";
import { changeManagerEmployees } from "./api/employees";

export default function PermissionsChangesDialog({ open, onClose, setToast }) {
  const context = useSettingsContext();
  const updatedPermissions = context?.updatedPermissions;
  const employee = updatedPermissions?.[0]?.employee;
  const employeesManagementUpdate = context?.employeesManagementUpdate;
  const employeesToManagers = updatedPermissions?.filter(
    (emp) => emp.newPermission === "Manager"
  );
  console.log("employeesToManagers", employeesToManagers);
  const managersToEmployees = updatedPermissions?.filter(
    (emp) => emp.newPermission === "Employee"
  );

  const onSubmit = async () => {
    try {
      const payload = {
        managerId: employeesManagementUpdate?.manager?.empId,
        empIds:
          employeesManagementUpdate?.managedEmployees?.map(
            (emp) => emp.empId
          ) || [],
      };
      console.log(payload);

      await changeManagerEmployees([payload]);
      onClose();
      setToast({
        open: true,
        severity: "success",
        message: "Permission updated successfully",
      });
    } catch (error) {
      console.error("Error submitting manager changes:", error);
      setToast({
        open: true,
        severity: "error",
        message: "Failed to update permissions",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between">
        <DialogTitle>
          {employeesToManagers.length > 0
            ? `Select all employees under ${employee?.firstName} ${employee?.lastName}`
            : `Select manager of ${employee?.firstName} ${employee?.lastName}`}
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
        {employeesToManagers.length > 0 ? (
          <EmpToManagersSection />
        ) : (
          <ManagersToEmpSection
            targetEmployees={managersToEmployees}
            onSubmit={onSubmit}
          />
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
