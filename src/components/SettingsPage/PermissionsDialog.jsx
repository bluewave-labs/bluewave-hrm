import { Stack } from "@mui/system";
import {
  Typography,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/system";
import { colors, fonts } from "../../Styles";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HRMButton from "../Button/HRMButton";
import { Dialog, DialogTitle } from "./SettingsDialog/styles";
import EmployeesPermissionDialog from "./EmployeesPermissionDialog";
import { useSettingsContext } from "./context";

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

const TableHeaderCell = styled(TableCell)({
  color: colors.darkGrey,
  paddingTop: "10px",
  paddingBottom: "10px",
});

const TableBodyCell = styled(TableCell)({
  color: colors.darkGrey,
  paddingTop: "25px",
  paddingBottom: "25px",
});

export default function PermissionsDialog({
  style,
  open,
  onClose,
  openEmployeesPermissionDialog,
}) {
  const { updatedPermissions } = useSettingsContext();

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
        <TableContainer
          sx={{
            fontFamily: fonts.fontFamily,
            ...style,
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                <TableHeaderCell key="Name">
                  <TextHeader>Name</TextHeader>
                </TableHeaderCell>
                <TableHeaderCell key="Role">
                  <TextHeader>Changes</TextHeader>
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {updatedPermissions.map(({ employee, newPermission }) => {
                return (
                  <TableRow key={`${employee.firstName}${employee.lastName}`}>
                    <TableBodyCell>
                      <Text>
                        {employee.firstName} {employee.lastName}
                      </Text>
                    </TableBodyCell>
                    <TableBodyCell>
                      <Text sx={{ display: "flex", alignItems: "center" }}>
                        {employee.permission.type}
                        <ArrowForwardIcon
                          sx={{
                            margin: "0 5px",
                            fontSize: "small",
                            textAlign: "center",
                          }}
                        />
                        {newPermission}
                      </Text>
                    </TableBodyCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
          <HRMButton mode="primary" onClick={openEmployeesPermissionDialog}>
            Save
          </HRMButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
