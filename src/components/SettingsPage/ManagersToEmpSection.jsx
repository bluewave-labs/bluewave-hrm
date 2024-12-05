import { useState } from "react";
import {
  Typography,
  Grid,
  MenuList,
  Autocomplete,
  Button,
  Chip,
} from "@mui/material";
import { TextField } from "./SettingsDialog/styles";
import { useSettingsContext } from "./context";

export default function ManagersToEmpSection({ targetEmployees }) {
  const context = useSettingsContext();
  const employees = context?.employees;
  const updatedPermissions = context?.updatedPermissions;
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
            {`Select manager of ${selectedEmployee?.firstName} ${selectedEmployee?.lastName}`}
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
              <TextField {...params} placeholder="Select manager" />
            )}
            sx={{
              width: "100%",
              marginBottom: "16px",
            }}
            onChange={(event, value) => addNewManagedEmployee(value)}
          />
        </Grid>
      )}
    </Grid>
  );
}
