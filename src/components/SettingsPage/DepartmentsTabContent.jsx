import { useForm } from "react-hook-form";
import { Box, Stack } from "@mui/system";
import {
  styled,
  TextField as MUITextField,
  Typography,
  Dialog as MUIDialog,
  DialogTitle as MUIDialogTitle,
  DialogContent,
} from "@mui/material";
import PagesNavBar from "../UpdatesPage/PagesNavBar";
import { colors, fonts } from "../../Styles";
import { useState } from "react";
import DepartmentsTable from "./DepartmentsTable";
import HRMButton from "../Button/HRMButton";
import axios from "axios";

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

const Dialog = styled(MUIDialog)({
  "& .MuiDialog-paper": {
    width: "500px",
    borderRadius: "10px",
  },
});

export default function DepartmentsTabContent({ departments, style }) {
  const [currentPage, setCurrentPage] = useState(1); //The current page number
  const [openAddDepartment, setOpenAddDepartment] = useState(false);
  const [openEditDepartment, setOpenEditDepartment] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

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
    console.log("handleClosehahaha", data);
    axios
      .post("http://localhost:3000/api/departments", data)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        const addedDepartment = response.data.message;
        console.log("Added new department:", addedDepartment);
        reset({ departmentName: "" });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const errorMessage =
          error.response?.data?.message || "Failed to add department";
        console.log(errorMessage);
        setError("departmentName", {
          message: errorMessage,
        });
      });
    clearErrors("departmentName");
    setOpenAddDepartment(false);
  };

  const handleClose = () => {
    console.log("handleClose");
    setOpenAddDepartment(false);
  };

  const editDepartment = () => {
    reset({ departmentName: "" });
    clearErrors("departmentName");
    setOpenEditDepartment(true);
  };

  const handleEditDepartment = (data) => {
    console.log(data);
  }

  const handleEditClose = () => {
    console.log("handle edit Close");
    setOpenEditDepartment(false);
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
        <HRMButton mode="primary" onClick={editDepartment}>
          Edit
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

      <DepartmentsTable
        departments={departments}
        sx={{ marginBottom: "40px" }}
      />
      {departments.length > 0 ? (
        <>
          {departments.length > 10 && (
            <PagesNavBar
              numOfEntries={departments.length}
              currentPage={currentPage}
              handlePage={handlePage}
            />
          )}
        </>
      ) : (
        <p>There is no departments right now.</p>
      )}
    </Box>
  );
}

DepartmentsTabContent.defaultProps = {
  style: {},
};
