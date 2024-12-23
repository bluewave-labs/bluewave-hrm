import { Stack, Typography, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HRMButton from "../Button/HRMButton";
import { Dialog, DialogTitle } from "./SettingsDialog/styles";
import { useSettingsContext } from "./context";
import ChooseManager from "./ChooseManager";
import ChooseEmployees from "./ChooseEmployees";
import {
  changeManagerEmployees,
  removeManagement,
  changePermission,
} from "./api/employees";

const PERMISSION_IDS = {
  Administrator: 1,
  Manager: 2,
  Employee: 3,
};

export default function PermissionsDialog({ open, onClose, setToast }) {
  console.log("Ïnside PermissionsDialog");
  const context = useSettingsContext();
  const updatedPermissions = context?.updatedPermissions;
  const managerToEmployee = context?.managerToEmployee;
  const employee = updatedPermissions?.[0]?.employee;
  const employeesManagementUpdate = context?.employeesManagementUpdate;
  const employeesToManagers = updatedPermissions?.filter(
    (emp) => emp.newPermission === "Manager"
  );
  console.log("employeesToManagers", employeesToManagers);
  const managersToEmployees = updatedPermissions?.filter(
    (emp) => emp.newPermission === "Employee"
  );

  const handleManagerEmployeesChange = async () => {
    const payload = {
      managerId: employeesManagementUpdate?.manager?.empId,
      empIds:
        employeesManagementUpdate?.managedEmployees?.map((emp) => emp.empId) ||
        [],
    };
    await changeManagerEmployees([payload]);
  };

  const handleRemoveManagement = async () => {
    const payload = {
      managerId: managerToEmployee?.manager?.empId,
      employeeId: managerToEmployee?.employee?.empId,
    };
    await removeManagement(payload);
  };

  const handlePermissionChange = async () => {
    console.log("handlePermissionChange", handlePermissionChange);
    const payload = {
      id: updatedPermissions?.[0]?.employee?.empId,
      permissionId: PERMISSION_IDS[updatedPermissions?.[0]?.newPermission],
    };
    console.log("payload", payload);
    // await changePermission(payload);
  };

  const onSubmit = async () => {
    try {
      if (employeesManagementUpdate?.managedEmployees?.length > 0) {
        await handleManagerEmployeesChange();
      }

      if (managerToEmployee?.manager) {
        await handleRemoveManagement();
      }

      await handlePermissionChange();

      setToast({
        open: true,
        severity: "success",
        message: "Permissions updated successfully",
      });
      onClose();
    } catch (error) {
      console.error("Error updating permissions:", error);
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
          {`Confirm ${employee?.firstName} ${employee?.lastName} change: ${employee?.permission?.type} → ${updatedPermissions?.[0]?.newPermission}`}
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
        {updatedPermissions?.[0]?.newPermission === "Manager" && (
          <ChooseEmployees />
        )}
        {updatedPermissions?.[0]?.newPermission === "Employee" && (
          <ChooseManager />
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
              Confirm
          </HRMButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
