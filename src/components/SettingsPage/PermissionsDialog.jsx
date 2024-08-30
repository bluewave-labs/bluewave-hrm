import { Stack } from "@mui/system";
import { DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HRMButton from "../Button/HRMButton";
import { Dialog, DialogTitle } from "./SettingsDialog/styles";
import { useSettingsContext } from "./context";

export default function PermissionsDialog({ open, onClose }) {
  const { updatedPermissions } = useSettingsContext();

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between">
        <DialogTitle>Do you want to approve following changes?</DialogTitle>
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
        {updatedPermissions.map(({ employee, newPermission }) => (
          <>
            <p>
              {employee.firstName} {employee.lastName}
            </p>
            <p>
              {employee.permission.type} - {newPermission}
            </p>
          </>
        ))}
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
