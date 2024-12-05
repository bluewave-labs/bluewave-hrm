import { useState } from "react";
import {
  Typography,
  Grid,
  MenuList,
  Autocomplete,
  Button,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "./SettingsDialog/styles";
import { useSettingsContext } from "./context";

export default function EmpToManagersSection({ targetEmployees }) {
  const context = useSettingsContext();
  const employees = context?.employees;

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [managedEmployees, setManagedEmployees] = useState("");

  const selectEmployee = (employee) => {
    setSelectedEmployee(employee);
    const getManagedEmployees = employees.filter(
      (emp) => emp.Manager && emp.Manager.empId === employee.empId
    );
    setManagedEmployees(getManagedEmployees);
  };

  const addNewManagedEmployee = (employee) => {
    const newManagedEmployees = [...managedEmployees, employee];
    setManagedEmployees(newManagedEmployees);
  };

  const deleteManagedEmployee = (employeeToDelete) => {
    const updatedManagedEmployees = managedEmployees.filter(
      (employee) => employee.empId !== employeeToDelete.empId
    );
    setManagedEmployees(updatedManagedEmployees);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <MenuList>
          {targetEmployees?.map(({ employee }) => {
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
      {selectedEmployee && (
        <Grid item xs={7}>
          <Typography
            sx={{
              fontWeight: "700",
              marginBottom: "12px",
              color: "#101828",
              fontSize: "13px",
            }}
          >
            {`Select all employees under ${selectedEmployee?.firstName} ${selectedEmployee?.lastName}`}
          </Typography>
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
      )}
    </Grid>
  );
}
