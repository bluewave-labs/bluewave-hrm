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
import PagesNavBar from "../UpdatesPage/PagesNavBar";
import { colors, fonts } from "../../Styles";
import { useState } from "react";
import DepartmentsTable from "./DepartmentsTable";
import HRMButton from "../Button/HRMButton";
import axios from "axios";
import Toast from "./Toast";
import { useSettingsContext } from "./context";

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

export default function DepartmentsTabContent({ style }) {
  const { departmentsPeople, departments, fetchDepartmentsPeople } =
    useSettingsContext();
  const [selectedDepartment, setSelectedDepartment] = useState({});
  const [currentPage, setCurrentPage] = useState(1); //The current page number
  const [openAddDepartment, setOpenAddDepartment] = useState(false);
  const [openEditDepartment, setOpenEditDepartment] = useState(false);
  const [openDeleteDepartment, setOpenDeleteDepartment] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();
  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  //Function for changing the page number
  function handlePage(n) {
    if (n > 0 && n <= Math.ceil(departments.length / 10)) {
      setCurrentPage(n);
    }
  }

  const addDepartment = () => {
    reset({ departmentName: "" });
    clearErrors("departmentName");
    setOpenAddDepartment(true);
  };

  const handleAddDepartment = (data) => {
    axios
      .post("http://localhost:3000/api/departments", data)
      .then((response) => {
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
          reset({ departmentName: "" });
          setOpenAddDepartment(false);
          setToast({
            open: true,
            severity: "success",
            message: "Department created successfully",
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const errorMessage =
          error.response?.data?.message || "Failed to add new department";
        setError("departmentName", {
          message: errorMessage,
        });
      });
  };

  const handleClose = () => {
    console.log("handleClose");
    setOpenAddDepartment(false);
  };

  const editDepartment = (selectedDepartment) => {
    reset({ departmentName: "" });
    clearErrors("departmentName");
    setSelectedDepartment(selectedDepartment);
    setValue("departmentName", selectedDepartment.departmentName);
    setOpenEditDepartment(true);
  };

  const handleEditDepartment = (data) => {
    const editDepartmentData = departments.find(
      (department) => department.id === selectedDepartment.id
    );

    axios
      .put("http://localhost:3000/api/departments", {
        ...editDepartmentData,
        departmentName: data.departmentName,
      })
      .then((response) => {
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
          reset({ departmentName: "" });
          setOpenEditDepartment(false);
          setToast({
            open: true,
            severity: "success",
            message: "Department edited successfully",
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const errorMessage =
          error.response?.data?.message || "Failed to add new department";
        setError("departmentName", {
          message: errorMessage,
        });
      });
  };

  const handleEditClose = () => {
    setOpenEditDepartment(false);
  };

  const deleteDepartment = (selectedDepartment) => {
    console.log(selectedDepartment);
    setSelectedDepartment(selectedDepartment);
    // setValue("departmentName", selectedDepartment.departmentName);
    setOpenDeleteDepartment(true);
  };

  const handleDeleteDepartment = () => {
    console.log("handleDelete");
    // console.log(data);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDepartment(false);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <Box
      sx={{
        ...{
          marginTop: "40px",
          color: colors.darkGrey,
          fontFamily: fonts.fontFamily,
        },
        ...style,
      }}
    >
      <Stack
        direction="row"
        alignContent="center"
        justifyContent="space-between"
        style={{ marginBottom: "20px" }}
      >
        <HeadText>Departments</HeadText>
        <HRMButton mode="primary" onClick={addDepartment}>
          Add new
        </HRMButton>
      </Stack>

      <Dialog open={openAddDepartment} onClose={handleClose}>
        <DialogTitle>Add a new department</DialogTitle>
        <DialogContent>
          <TextLabel>Name</TextLabel>
          <form>
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
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={2}
              sx={{ marginTop: "50px" }}
            >
              <HRMButton
                mode="secondaryB"
                onClick={handleClose}
                color="primary"
              >
                Cancel
              </HRMButton>
              <HRMButton
                mode="primary"
                onClick={handleSubmit(handleAddDepartment)}
              >
                Save
              </HRMButton>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDepartment} onClose={handleEditClose}>
        <DialogTitle>Rename department</DialogTitle>
        <DialogContent>
          <TextLabel>New name</TextLabel>
          <form>
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
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={2}
              sx={{ marginTop: "50px" }}
            >
              <HRMButton
                mode="secondaryB"
                onClick={handleEditClose}
                color="primary"
              >
                Cancel
              </HRMButton>
              <HRMButton
                mode="primary"
                onClick={handleSubmit(handleEditDepartment)}
              >
                Save
              </HRMButton>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteDepartment} onClose={handleDeleteClose}>
        <DialogTitle>Where do you want to transfer employees?</DialogTitle>
        <DialogContent>
          <TextLabel>Transfer employees to</TextLabel>
          <form>
            <Autocomplete
              disablePortal
              options={departments}
              getOptionLabel={(option) => option.departmentName}
              renderInput={(params) => <TextField {...params} />}
              value={selectedDepartment}
              onChange={(_, value) => {
                setSelectedDepartment(value);
                setValue("departmentId", value.id);
              }}
              fullWidth
              size="small"
              color="secondary"
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={2}
              sx={{ marginTop: "50px" }}
            >
              <HRMButton
                mode="secondaryB"
                onClick={handleDeleteClose}
                color="primary"
              >
                Cancel
              </HRMButton>
              <HRMButton
                mode="primary"
                onClick={handleSubmit(handleDeleteDepartment)}
              >
                Save
              </HRMButton>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>

      <DepartmentsTable
        editDepartmentBtn={editDepartment}
        deleteDepartmentBtn={deleteDepartment}
        sx={{ marginBottom: "40px" }}
      />
      {departmentsPeople.length > 0 ? (
        <>
          {departmentsPeople.length > 10 && (
            <PagesNavBar
              numOfEntries={departmentsPeople.length}
              currentPage={currentPage}
              handlePage={handlePage}
            />
          )}
        </>
      ) : (
        <p>There is no departments right now.</p>
      )}
      <Toast
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        onClose={handleCloseToast}
      />
    </Box>
  );
}

DepartmentsTabContent.defaultProps = {
  style: {},
};
