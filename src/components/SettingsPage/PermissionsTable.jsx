import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, Stack, Avatar, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { colors, fonts } from "../../Styles";
import Checkbox from "../Checkbox/Checkbox";
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

export default function PermissionsTable({ contentList, style }) {
  const context = useSettingsContext();
  const updatedPermissions = context?.updatedPermissions;
  const setUpdatedPermissions = context?.setUpdatedPermissions;
  const isLoading = context?.isLoading;

  const updatePermission = (newPermission, employee) => {
    setUpdatedPermissions((updatedPermissions) => {
      const updatedPermissionEmployee = {
        employee,
        newPermission,
      };

      const isEmployeeAlreadySelected = updatedPermissions.some(
        (emp) => emp.employee.id === updatedPermissionEmployee?.employee?.id
      );
      if (!isEmployeeAlreadySelected) {
        return [...updatedPermissions, updatedPermissionEmployee];
      }

      const filteredEmployees = updatedPermissions?.filter(
        (emp) => emp.employee.id !== employee.id
      );

      if (newPermission === employee.permission.type) {
        return filteredEmployees;
      }

      return [...filteredEmployees, updatedPermissionEmployee];
    });
  };

  if (isLoading?.employees || isLoading?.users)
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", padding: "10px" }}
      >
        <CircularProgress />
      </Stack>
    );
  if (contentList?.length === 0) return <p>There are no records right now.</p>;

  return (
    <TableContainer
      sx={{
        minWidth: "885px",
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
              <TextHeader>Role</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell key="Team">
              <TextHeader>Team</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell key="Admin">
              <TextHeader>Admin</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell key="Manager">
              <TextHeader>Manager</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell key="Employee">
              <TextHeader>Employee</TextHeader>
            </TableHeaderCell>
            <TableHeaderCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {contentList?.map((item) => {
            const selectedEmployeePermission = updatedPermissions.find(
              (emp) => emp.employee.id === item.id
            )?.newPermission;
            return (
              <TableRow key={item.id}>
                <TableBodyCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      alt="Employee Photo"
                      src={"data:image/png;base64," + atob(item.photo)}
                    />
                    <Text>{`${item?.firstName} ${item?.lastName}`}</Text>
                  </Stack>
                </TableBodyCell>
                <TableBodyCell>
                  <Text>{item?.role.roleTitle}</Text>
                </TableBodyCell>
                <TableBodyCell>
                  <Text>{item?.team.teamName}</Text>
                </TableBodyCell>
                <TableBodyCell>
                  <Checkbox
                    type="radio"
                    id={`permission-admin-${item?.id}`}
                    name={`permission-${item?.id}`}
                    value="Administrator"
                    checked={
                      (selectedEmployeePermission || item?.permission.type) ===
                      "Administrator"
                    }
                    onChange={(e) => updatePermission(e.target.value, item)}
                  />
                </TableBodyCell>
                <TableBodyCell>
                  <Checkbox
                    type="radio"
                    id={`permission-manager-${item?.id}`}
                    name={`permission-${item?.id}`}
                    value="Manager"
                    checked={
                      (selectedEmployeePermission || item?.permission.type) ===
                      "Manager"
                    }
                    onChange={(e) => updatePermission(e.target.value, item)}
                  />
                </TableBodyCell>
                <TableBodyCell>
                  <Checkbox
                    type="radio"
                    id={`permission-employee-${item?.id}`}
                    name={`permission-${item?.id}`}
                    value="Employee"
                    checked={
                      (selectedEmployeePermission || item?.permission.type) ===
                      "Employee"
                    }
                    onChange={(e) => updatePermission(e.target.value, item)}
                  />
                </TableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
