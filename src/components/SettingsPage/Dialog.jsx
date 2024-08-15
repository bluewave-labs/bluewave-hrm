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
import { departmentsApi, jobTitlesApi } from "./api";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Dialog = styled(MUIDialog)({
  "& .MuiDialog-paper": {
    width: "500px",
    borderRadius: "10px",
  },
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

const successMessage = (action, isDepartment) => {
  const item = isDepartment ? "Department" : "Job title";
  switch (action) {
    case "edit":
      return `${item} edited successfully`;
    case "delete":
      return `${item} deleted successfully`;
    default:
      return `${item} added successfully`;
  }
};

const errorMessage = (action) => `Failed to ${action}`;

export default function CustomDialog({
  open,
  onClose,
  content,
  action,
  selectedItem,
  setToast,
}) {
  const {
    departments,
    fetchDepartments,
    fetchDepartmentsPeople,
    jobTitles,
    fetchJobTitles,
    fetchJobTitlesPeople,
    employees,
  } = useSettingsContext();

  const isDepartment = content === "departments";

  useEffect(() => {
    reset(
      isDepartment
        ? { departmentName: selectedItem?.departmentName ?? "" }
        : { roleTitle: selectedItem?.roleTitle ?? "" }
    );
  }, [open]);

  const configs = {
    add: {
      title: `Add a new ${isDepartment ? "department" : "job title"}`,
      label: "Name",
    },
    edit: {
      title: `Rename ${isDepartment ? "department" : "job title"}`,
      label: "New name",
    },
    delete: {
      title: "Where do you want to transfer employees?",
      label: "Transfer employees to",
    },
  };

  const fieldName = isDepartment ? "departmentName" : "roleTitle";

  const validationRules = {
    required: isDepartment
      ? "Department name is required."
      : "Job title is required.",
    minLength: {
      value: 2,
      message: isDepartment
        ? "Department name must be at least 2 characters."
        : "Job title must be at least 2 characters.",
    },
  };

  const transfOptions = useMemo(() => {
    if (!selectedItem) return [];

    const items = isDepartment
      ? departments.filter((department) => department.id !== selectedItem.id)
      : jobTitles.filter((jobTitle) => jobTitle.roleId !== selectedItem.roleId);

    return items.sort((a, b) =>
      isDepartment
        ? a.departmentName.localeCompare(b.departmentName)
        : a.roleTitle.localeCompare(b.roleTitle)
    );
  }, [selectedItem]);

  const [transferEmployees, setTransferEmployees] = useState(
    transfOptions[0] || {}
  );

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const addAction = action === "add";
  const deleteAction = action === "delete";

  useEffect(() => {
    reset();
  }, [open]);

  useEffect(() => {
    setTransferEmployees(transfOptions[0] || {});
  }, [transfOptions]);

  const handleSuccess = (response) => {
    console.log("Data submitted successfully:", response.data);
    const responseMessage = response.data;
    if (
      typeof responseMessage === "string" &&
      responseMessage?.includes("already exists")
    ) {
      setError(fieldName, {
        message: responseMessage,
      });
    } else {
      fetchDepartmentsPeople();
      fetchDepartments();
      fetchJobTitlesPeople();
      fetchJobTitles();
      onClose();
      setToast({
        open: true,
        severity: "success",
        message: successMessage(action, isDepartment),
      });
    }
  };

  const handleError = (error) => {
    console.error("Error submitting data:", error);
    onClose();
    setToast({
      open: true,
      severity: "error",
      message: errorMessage(action),
    });
  };

  const addData = (formData) => {
    const jobTitleData = {
      ...formData,
      minimumSalary: 0,
      maximumSalary: 0,
    };
    if (isDepartment)
      departmentsApi.create(formData).then(handleSuccess).catch(handleError);
    else
      jobTitlesApi.create(jobTitleData).then(handleSuccess).catch(handleError);
  };

  const editData = (formData) => {
    const fetchedData = isDepartment ? departments : jobTitles;
    const editData = fetchedData.find(
      (fetchItem) =>
        fetchItem[isDepartment ? "id" : "roleId"] ===
        selectedItem[isDepartment ? "id" : "roleId"]
    );

    const data = {
      ...editData,
      ...(isDepartment
        ? { departmentName: formData.departmentName }
        : { roleTitle: formData.roleTitle }),
    };

    if (isDepartment)
      departmentsApi.update(data).then(handleSuccess).catch(handleError);
    else jobTitlesApi.update(data).then(handleSuccess).catch(handleError);
  };

  const handleDeleteData = () => {
    if (isDepartment)
      departmentsApi
        .delete(selectedItem.id)
        .then(handleSuccess)
        .catch(handleError);
    else
      jobTitlesApi
        .delete(selectedItem.roleId)
        .then(handleSuccess)
        .catch(handleError);
  };

  const handleTransferEmployees = (employeesTransfer) =>
    axios
      .post(
        `http://localhost:3000/api/employees/change/${isDepartment ? "department" : "job"}`,
        employeesTransfer
      )
      .then((response) => {
        console.log("Transfer employess successfully:", response.data);
        handleDeleteData();
      })
      .catch((error) => {
        console.error("Transfer employess error:", error);
      });

  const deleteData = () => {
    const employeeEmpIds = employees
      .filter((employee) => {
        if (isDepartment) {
          return employee.departmentId === selectedItem.id;
        }
        return employee.roleId === selectedItem.roleId;
      })
      .map((employee) => employee.empId);

    if (isDepartment) {
      return handleTransferEmployees({
        employeeEmpIds,
        destinationDepartmentId: transferEmployees.id,
      });
    }
    return handleTransferEmployees({
      employeeEmpIds,
      destinationRoleId: transferEmployees.roleId,
    });
  };

  const handleDataSubmit = (data) => {
    if (action === "add") {
      addData(data);
    } else if (action === "edit") {
      editData(data);
    } else if (action === "delete") {
      deleteData();
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
              options={transfOptions}
              getOptionLabel={(option) =>
                isDepartment ? option.departmentName : option.roleTitle
              }
              renderInput={(params) => <TextField {...params} />}
              value={transferEmployees}
              onChange={(_, value) => {
                setTransferEmployees(value);
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
              {...register(fieldName, validationRules)}
              error={!!errors[fieldName]}
              helperText={errors[fieldName]?.message || ""}
              FormHelperTextProps={{
                className: errors[fieldName] ? "error" : "",
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
