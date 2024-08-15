import { Box, Stack } from "@mui/system";
import { styled, Typography } from "@mui/material";
import PagesNavBar from "../UpdatesPage/PagesNavBar";
import { useMemo, useState } from "react";
import HRMButton from "../Button/HRMButton";
import Toast from "./Toast";
import CustomDialog from "./Dialog";
import { useSettingsContext } from "./context";
import Grid from "@mui/system/Unstable_Grid";
import ListTable from "./ListTable";
import TimeOffTable from "./TimeOffTable";

const HeadText = styled(Typography)({
  fontSize: "18px",
  lineHeight: "28px",
  color: "#101828",
  fontWeight: "500",
});

const PAGE_SIZE = 10; //items per page (pagination)

export default function ListTabContent({ style, content }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { departmentsPeople, jobTitlesPeople } = useSettingsContext();
  const [selectedItem, setSelectedItem] = useState({});
  const [action, setAction] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  console.log("content", content);

  const isDepartment = content === "departments";

  const tabPageTitle = (() => {
    switch (content) {
      case "jobTitles":
        return "Job Titles";
      case "timeoff":
        return "Time Off";
      default:
        return "Departments";
    }
  })();

  const contentList = useMemo(() => {
    const fetch = isDepartment ? departmentsPeople : jobTitlesPeople;
    return fetch.sort((a, b) =>
      isDepartment
        ? a.departmentName.localeCompare(b.departmentName)
        : a.roleTitle.localeCompare(b.roleTitle)
    );
  }, [isDepartment, departmentsPeople, jobTitlesPeople]);

  console.log("jobTitlesPeople", jobTitlesPeople);
  console.log("contentList", contentList);

  const itemsToDisplay = useMemo(
    () =>
      contentList.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [currentPage, contentList]
  );

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const openDialog = (item, action) => {
    if (action) setAction(action);
    if (item) setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedItem();
  };

  const handlePage = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(contentList.length / PAGE_SIZE)
    ) {
      setCurrentPage(pageNumber);
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
              {tabPageTitle}
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
            {content === "timeoff" ? (
              <TimeOffTable
                openDialog={openDialog}
                content={"departments"}
                contentList={itemsToDisplay}
                sx={{ marginBottom: "40px" }}
              />
            ) : (
              <ListTable
                openDialog={openDialog}
                content={content}
                contentList={itemsToDisplay}
                sx={{ marginBottom: "40px" }}
              />
            )}
            {contentList.length > PAGE_SIZE && (
              <PagesNavBar
                numOfEntries={contentList.length}
                currentPage={currentPage}
                handlePage={handlePage}
              />
            )}
          </>
        ) : isDepartment ? (
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
