import { useMemo, useState } from "react";
import { Grid, Autocomplete, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "./SettingsDialog/styles";
import { useSettingsContext } from "./context";

export default function EmpToManagersSection() {
  const context = useSettingsContext();
  const employees = context?.employees;
  const updatedPermissions = context?.updatedPermissions;
  const [managedEmployees, setManagedEmployees] = useState("");

  const availableEmployees = useMemo(
    () =>
      employees?.filter(
        (emp) =>
          Number(emp?.empId) !== Number(updatedPermissions?.[0]?.employee?.id)
      ) || [],
    [updatedPermissions]
  );

  console.log("updatedPermissions", updatedPermissions?.[0].employee?.id);

  console.log("availableEmployees", availableEmployees);

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
  );
}
