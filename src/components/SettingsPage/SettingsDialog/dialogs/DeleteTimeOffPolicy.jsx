import { useSettingsContext } from "../../context";
import { Controller } from "react-hook-form";
import { useMemo } from "react";
import { Autocomplete } from "@mui/material";
import { TextField } from "../styles";

export const DeleteTimeOffPolicy = ({ form, selectedItem }) => {
  const { departments } = useSettingsContext();

  const transferDepartmentOptions = useMemo(() => {
    if (!selectedItem) return [];
    return departments
      .filter((department) => department.id !== selectedItem.id)
      .sort((a, b) => a.departmentName.localeCompare(b.departmentName));
  }, [selectedItem]);

  return (
    <Controller
      name="departmentDestination"
      control={form.control}
      defaultValue={transferDepartmentOptions[0] || {}}
      render={({ field: { onChange, ...props } }) => (
        <Autocomplete
          color="secondary"
          fullWidth
          getOptionLabel={(option) => option.departmentName}
          onChange={(_, value) => onChange(value)}
          options={transferDepartmentOptions}
          renderInput={(params) => <TextField {...params} />}
          size="small"
          {...props}
        />
      )}
    />
  );
};
