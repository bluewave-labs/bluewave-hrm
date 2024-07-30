import { useForm } from "react-hook-form";
import { Box, Stack } from "@mui/system";
import {
  styled,
  TextField as MUITextField,
  Typography,
  Dialog as MUIDialog,
  DialogTitle as MUIDialogTitle,
  DialogContent,
  Autocomplete,
} from "@mui/material";
import HRMButton from "../Button/HRMButton";
import { useSettingsContext } from "./context";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const Dialog = styled(MUIDialog)({
  "& .MuiDialog-paper": {
    width: "500px",
    borderRadius: "10px",
  },
});

const HeadText = styled(Typography)({
  fontSize: "18px",
  fontWeight: "500",
  lineHeight: "28px",
  color: " #344054",
});

const DialogTitle = styled(MUIDialogTitle)({
  fontSize: "16px",
  fontWeight: "600",
  color: "#344054",
});

const TextLabel = styled(Typography)({
  fontSize: "13px",
  fontWeight: "400",
  marginBottom: "10px",
  color: "#000000",
});

const TextField = styled(MUITextField)({
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    padding: "4px 10px",
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#FDA29B",
    },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#D92D20",
    fontSize: "11px",
    fontWeight: 400,
    marginLeft: 0,
    lineHeight: "24px",
    textAlign: "left",
  },
});

const getDialogConfig = (action) => {
  const configs = {
    add: {
      title: "Add a new department",
      label: "Name",
    },
    edit: {
      title: "Rename department",
      label: "New name",
    },
    delete: {
      title: "Where do you want to transfer employees?",
      label: "Transfer employees to",
    },
  };

  return configs[action] || {};
};

export default function CustomDialog({
  open,
  onClose,
  action,
  checkedDepartment,
}) {
  console.log("custom dialog selected", checkedDepartment);
  const [dialog, setDialog] = useState({ title: "", label: "" });
  const { departments } = useSettingsContext();
  console.log("departments dialog");
  console.log(departments);
  const deleteDepartment = action === "delete";
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();
  console.log("state selected", checkedDepartment);

  useEffect(() => {
    setDialog(getDialogConfig(action));
  }, [action]);

  if (action === "edit")
    setValue("departmentName", checkedDepartment.departmentName);

  const handleDataSubmit = (action) => {
    console.log("handle Submit", action);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between">
        <DialogTitle sx={{ marginTop: "10px", paddingBottom: "0" }}>
          {dialog.title}
        </DialogTitle>
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
        <TextLabel>{dialog.label}</TextLabel>
        <form>
          {deleteDepartment ? (
            <Autocomplete
              disablePortal
              options={departments}
              getOptionLabel={(option) => option.departmentName}
              renderInput={(params) => <TextField {...params} />}
              value={checkedDepartment}
              onChange={(_, value) => {
                checkedDepartment = value;
              }}
              fullWidth
              size="small"
              color="secondary"
            />
          ) : (
            <TextField
              size="small"
              fullWidth
              color="secondary"
              {...register("departmentName", {
                required: "Department name is required.",
                minLength: {
                  value: 2,
                  message: "Department name must be at least 2 characters.",
                },
              })}
              error={!!errors.departmentName}
              helperText={errors.departmentName?.message || ""}
              FormHelperTextProps={{
                className: errors.departmentName ? "error" : "",
              }}
            />
          )}
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
            <HRMButton
              mode="primary"
              onClick={
                deleteDepartment
                  ? handleDataSubmit
                  : handleSubmit(handleDataSubmit)
              }
            >
              Save
            </HRMButton>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
