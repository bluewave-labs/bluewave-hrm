import { Box, Stack } from "@mui/system";
import { styled, Typography } from "@mui/material";
import PagesNavBar from "../UpdatesPage/PagesNavBar";
import { useEffect, useState } from "react";
import HRMButton from "../Button/HRMButton";
import Toast from "./Toast";
import CustomDialog from "./Dialog";
import { useSettingsContext } from "./context";
import Grid from "@mui/system/Unstable_Grid";
import ListTable from "./ListTable";

const HeadText = styled(Typography)({
  fontSize: "18px",
  lineHeight: "28px",
  color: "#101828",
  fontWeight: "500",
});

export default function ListTabContent({ style, content }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { departmentsPeople, departments, jobTitlesPeople, jobTitles } =
    useSettingsContext();
  const [selectedItem, setSelectedItem] = useState({});
  const [action, setAction] = useState();
  const [isDepartmentContent, setIsDepartmentContent] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const isDepartment = content === "departments";
    setIsDepartmentContent(isDepartment);
    const data = isDepartment ? departmentsPeople : jobTitlesPeople;
    setContentList(data);
  }, [content]);

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const openDialog = (item, action) => {
    if (action) setAction(action);
    if (item) setSelectedItem(item);
    console.log(item);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedItem();
  };

  const itemsToDisplay = contentList.slice(
    (currentPage - 1) * 8,
    currentPage * 8
  );

  const handlePage = (n) => {
    if (n > 0 && n <= Math.ceil(contentList.length / 8)) {
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
            <HeadText component="h3">
              {isDepartmentContent ? "Departments" : "Job Titles"}
            </HeadText>
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
          content={content}
          action={action}
          selectedItem={selectedItem}
          setToast={setToast}
        />

        {contentList.length > 0 ? (
          <>
            <ListTable
              openDialog={openDialog}
              content={content}
              contentList={itemsToDisplay}
              sx={{ marginBottom: "40px" }}
            />
            {contentList.length > 10 && (
              <PagesNavBar
                numOfEntries={contentList.length}
                currentPage={currentPage}
                handlePage={handlePage}
              />
            )}
          </>
        ) : isDepartmentContent ? (
          <p>There is no departments right now.</p>
        ) : (
          <p>There is no job titles right now.</p>
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
