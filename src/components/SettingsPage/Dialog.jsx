import { useForm } from "react-hook-form";
import { Stack } from "@mui/system";
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
import axios from "axios";

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

export default function CustomDialog({
  open,
  onClose,
  action,
  checkedDepartment,
  setToast,
}) {
  const { departments, fetchDepartmentsPeople } = useSettingsContext();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();
  const addAction = action === "add";
  const deleteAction = action === "delete";

  useEffect(() => {
    reset({ departmentName: checkedDepartment?.departmentName ?? "" });
  }, [open]);

  const handleSuccess = (response) => {
    console.log("Data submitted successfully:", response.data);
    const responseMessage = response.data;
    if (
      typeof responseMessage === "string" &&
      responseMessage?.includes("already exists")
    ) {
      setError("departmentName", {
        message: responseMessage,
      });
    } else {
      fetchDepartmentsPeople();
      onClose();
      setToast({
        open: true,
        severity: "success",
        message: addAction
          ? "Department created successfully"
          : "Department edited successfully",
      });
    }
  };

  const handleError = (error) => {
    console.error("Error submitting data:", error);
    onClose();
    setToast({
      open: true,
      severity: "error",
      message: addAction
        ? "Failed to add department"
        : "Failed to edit department",
    });
  };

  const addDepartment = (data) => {
    axios
      .post("http://localhost:3000/api/departments", data)
      .then(handleSuccess)
      .catch(handleError);
  };

  const editDepartment = (data) => {
    const editDepartmentData = departments.find(
      (department) => department.id === checkedDepartment.id
    );

    axios
      .put("http://localhost:3000/api/departments", {
        ...editDepartmentData,
        departmentName: data.departmentName,
      })
      .then(handleSuccess)
      .catch(handleError);
  };

  const deleteDepartment = () => {
    axios
      .delete(`http://localhost:3000/api/departments/${checkedDepartment.id}`)
      .then((response) => {
        console.log("Data deleted successfully:", response.data);
        fetchDepartmentsPeople();
        onClose();
        setToast({
          open: true,
          severity: "success",
          message: "Department deleted successfully",
        });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        onClose();
        setToast({
          open: true,
          severity: "error",
          message: "Failed to delete department",
        });
      });
  };

  const handleDataSubmit = (data) => {
    if (action === "add") {
      addDepartment(data);
    } else if (action === "edit") {
      editDepartment(data);
    } else if (action === "delete") {
      deleteDepartment();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between">
        <DialogTitle sx={{ marginTop: "10px", paddingBottom: "0" }}>
          {configs[action]?.title}
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
        <TextLabel>{configs[action]?.label}</TextLabel>
        <form>
          {deleteAction ? (
            <Autocomplete
              disablePortal
              options={departments}
              getOptionLabel={(option) => option.departmentName}
              renderInput={(params) => <TextField {...params} />}
              value={departments[0]}
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
                deleteAction ? handleDataSubmit : handleSubmit(handleDataSubmit)
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
