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

export default function EmployeesPermissionDialog({ open, onClose }) {
  const context = useSettingsContext();
  const employees = context?.employees;
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [managedEmployees, setManagedEmployees] = useState("");
  const updatedPermissions = context?.updatedPermissions;
  const managersToEmployees = updatedPermissions?.filter(
    (emp) => emp.newPermission === "Employee"
  );

  const onSubmit = (data) => {
    console.log("data", data);
    // remember to clear permissions value when save data to database
  };

  const selectEmployee = (employee) => {
    console.log("hello");
    setSelectedEmployee(employee);
    const getManagedEmployees = employees.filter(
      (emp) => emp.Manager && emp.Manager.empId === employee.empId
    );
    setManagedEmployees(getManagedEmployees);
    console.log("getManagedEmployees", getManagedEmployees);
  };

  const addNewManagedEmployee = (employee) => {
    const newManagedEmployees = [...managedEmployees, employee];
    setManagedEmployees(newManagedEmployees);
  };

  const deleteManagedEmployee = (employeeToDelete) => {
    console.log("hey hey");
    const updatedManagedEmployees = managedEmployees.filter(
      (employee) => employee.empId !== employeeToDelete.empId
    );
    setManagedEmployees(updatedManagedEmployees);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between">
        <DialogTitle>Select a manager under each employee</DialogTitle>
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
              {managersToEmployees?.map(({ employee }) => {
                return (
                  <Button
                    variant="text"
                    onClick={() => selectEmployee(employee)}
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "13px",
                      fontWeight: "400",
                      lineHeight: "20px",
                      textAlign: "left",
                      textTransform: "none",
                      color: "#667085",
                      backgroundColor:
                        selectedEmployee?.empId === employee?.empId
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
                {`Select all employees under ${selectedEmployee?.firstName}`}
              </Typography>
            )}
            <Autocomplete
              fullWidth
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
                marginBottom: "16px",
              }}
              onChange={(event, value) => addNewManagedEmployee(value)}
            />
            {managedEmployees?.length > 0 && (
              <Grid container spacing={2}>
                {managedEmployees?.map((employee) => (
                  <Grid item xs={6} key={employee.empId}>
                    <Chip
                      sx={{
                        corlor: "#344054",
                        borderRadius: "5px",
                        borderColor: "#D0D5DD",
                        fontSize: "13px",
                        padding: "2px",
                        height: "auto",
                        "& span": {
                          paddingLeft: "4px",
                        },
                      }}
                      label={employee.firstName + " " + employee.lastName}
                      variant="outlined"
                      onDelete={() => deleteManagedEmployee(employee)}
                      deleteIcon={
                        <CloseIcon
                          sx={{
                            width: "16px",
                            height: "16px",
                            marginRight: "4px",
                          }}
                        />
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            )}
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
