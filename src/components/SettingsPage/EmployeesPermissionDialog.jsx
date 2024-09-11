import { useState } from "react";
import { Stack } from "@mui/system";
import {
  Typography,
  DialogContent,
  Grid,
  MenuList,
  Autocomplete,
  Button,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import HRMButton from "../Button/HRMButton";
import { Dialog, DialogTitle, TextField } from "./SettingsDialog/styles";
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

export default function EmployeesPermissionDialog({ style, open, onClose }) {
  const { employees, updatedPermissions } = useSettingsContext();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [managedEmployees, setManagedEmployees] = useState("");

  // const selectEmployee = (employee) => {
  //   setSelectedEmployee(employee);
  //   const getManagedEmployees = employees.filter(
  //     (emp) => emp.Manager && emp.Manager.empId === employee.empId
  //   );
  //   setManagedEmployees(getManagedEmployees);
  // };

  const onSubmit = (data) => {
    console.log("data", data);
    // remember to clear permissions value when save data to database
  };

  const handleDelete = () => {
    console.log("hello");
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
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <MenuList>
              {updatedPermissions.map(({ employee }) => {
                return (
                  <Button
                    variant="text"
                    onClick={() => setSelectedEmployee(employee)}
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "13px",
                      fontWeight: "400",
                      lineHeight: "20px",
                      textAlign: "left",
                      textTransform: "none",
                      color: "#667085",
                      backgroundColor:
                        selectedEmployee.empId === employee.empId
                          ? "#F9FAFB"
                          : "",
                    }}
                  >
                    {employee.firstName} {employee.lastName}
                  </Button>
                );
              })}
            </MenuList>
          </Grid>
          <Grid item xs={7}>
            {selectedEmployee && (
              <Typography
                sx={{
                  fontWeight: "700",
                  marginBottom: "12px",
                  color: "#101828",
                  fontSize: "13px",
                }}
              >
                {`Select all employees under ${selectedEmployee.firstName}`}
              </Typography>
            )}
            <Autocomplete
              fullWidth
              // disablePortal
              color="secondary"
              size="small"
              options={employees}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName}`
              }
              renderInput={(params) => (
                <TextField {...params} placeholder="Select employees" />
              )}
              sx={{
                width: "100%",
                marginBottom: "40px",
              }}
            />
            {/* <Stack>
              {managedEmployees.length > 0 ? (
                managedEmployees.map((employee) => (
                  <Chip
                    key={employee.empId}
                    label={employee.firstName}
                    variant="outlined"
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <p>No employees found.</p>
              )}
            </Stack> */}
          </Grid>
        </Grid>
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
