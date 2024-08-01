import { Box, Stack } from "@mui/system";
import { styled, Typography } from "@mui/material";
import PagesNavBar from "../../UpdatesPage/PagesNavBar";
import { useState } from "react";
import HRMButton from "../../Button/HRMButton";
import Toast from "../Toast";
import CustomDialog from "./Dialog";
import { useSettingsContext } from "../context";
import Grid from "@mui/system/Unstable_Grid";
import JobTitlesTable from "./JobTitlesTable";

const HeadText = styled(Typography)({
  fontSize: "18px",
  lineHeight: "28px",
  color: "#101828",
  fontWeight: "500",
});

export default function JobTitlesTabContent({ style }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { departmentsPeople, departments } = useSettingsContext();
  const [selectedDepartment, setSelectedDepartment] = useState({});
  const [action, setAction] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const openDialog = (department, action) => {
    if (action) setAction(action);
    if (department) setSelectedDepartment(department);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedDepartment();
  };

  const departmentsToDisplay = departmentsPeople.slice(
    (currentPage - 1) * 8,
    currentPage * 8
  );

  const handlePage = (n) => {
    if (n > 0 && n <= Math.ceil(departments.length / 8)) {
      setCurrentPage(n);
    }
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <Box
      sx={{
        ...{
          paddingTop: 6,
          paddingBottom: 16,
          fontFamily: "Inter, sans-serif",
        },
        ...style,
      }}
    >
      <Grid container columns={10} rowSpacing={4} columnSpacing={1}>
        <Grid item xs={10} textAlign="center">
          <Stack
            direction="row"
            alignContent="center"
            justifyContent="space-between"
            style={{ marginBottom: "20px" }}
          >
            <HeadText component="h3">Departments</HeadText>
            <HRMButton
              mode="primary"
              onClick={() => openDialog(undefined, "add")}
            >
              Add new
            </HRMButton>
          </Stack>
        </Grid>
        <CustomDialog
          open={isDialogOpen}
          onClose={closeDialog}
          action={action}
          selectedDepartment={selectedDepartment}
          setToast={setToast}
        />

        {departmentsPeople.length > 0 ? (
          <>
            <JobTitlesTable
              openDialog={openDialog}
              departments={departmentsToDisplay}
              sx={{ marginBottom: "40px" }}
            />
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
      </Grid>
    </Box>
  );
}
