import { Grid, Autocomplete, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "./SettingsDialog/styles";
import { useSettingsContext } from "./context";
import { useEffect, useMemo } from "react";

export default function ChooseEmployees() {
  const context = useSettingsContext();
  const employees = context?.employees;
  const updatedPermissions = context?.updatedPermissions;
  const employeesManagementUpdate = context?.employeesManagementUpdate;

  const availableEmployees = useMemo(
    () =>
      employees?.filter(
        (emp) =>
          Number(emp?.id) !== Number(updatedPermissions?.[0]?.employee?.id)
      ) || [],
    [employees, updatedPermissions]
  );

  useEffect(() => {
    context.setEmployeesManagementUpdate([]);
  }, [updatedPermissions]);

  const addNewManagedEmployee = (employee) => {
    context.setEmployeesManagementUpdate((prev) => [...prev, employee]);
  };

  const deleteManagedEmployee = (employeeToDelete) => {
    context.setEmployeesManagementUpdate((prev) =>
      prev.filter((emp) => Number(emp.id) !== Number(employeeToDelete.id))
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Autocomplete
          fullWidth
          color="secondary"
          size="small"
          options={availableEmployees?.sort((a, b) =>
            a.firstName.localeCompare(b.firstName)
          )}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          renderInput={(params) => (
            <TextField {...params} placeholder="Select employees" />
          )}
          sx={{
            width: "100%",
            marginBottom: "16px",
          }}
          onChange={(event, value) => addNewManagedEmployee(value)}
        />

        <Grid container spacing={2}>
          {employeesManagementUpdate?.managedEmployees?.map((employee) => (
            <Grid item xs={6} key={employee.id}>
              <Chip
                sx={{
                  color: "#344054",
                  borderRadius: "5px",
                  borderColor: "#D0D5DD",
                  fontSize: "13px",
                  padding: "2px",
                  height: "auto",
                  "& span": {
                    paddingLeft: "4px",
                  },
                }}
                label={`${employee.firstName} ${employee.lastName}`}
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
      </Grid>
    </Grid>
  );
}
