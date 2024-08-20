import { Box, Stack } from "@mui/system";
import { styled, Typography } from "@mui/material";
import PagesNavBar from "../UpdatesPage/PagesNavBar";
import { useMemo, useState } from "react";
import HRMButton from "../Button/HRMButton";
import Toast from "./Toast";
import SettingsDialog from "./SettingsDialog";
import Grid from "@mui/system/Unstable_Grid";
import ListTable from "./ListTable";

const HeadText = styled(Typography)({
  fontSize: "18px",
  lineHeight: "28px",
  color: "#101828",
  fontWeight: "500",
});

const PAGE_SIZE = 10; //items per page (pagination)

export default function ListTabContent({
  columns,
  contentList,
  titleTabPage,
  tabName,
  style,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [action, setAction] = useState();
  const [currentPage, setCurrentPage] = useState(1);

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

  const openDialog = (action, item) => {
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
            <HeadText component="h3">{titleTabPage}</HeadText>
            <HRMButton
              mode="primary"
              onClick={() => openDialog("add")}
            >
              Add new
            </HRMButton>
          </Stack>
        </Grid>
        <SettingsDialog
          open={isDialogOpen}
          onClose={closeDialog}
          action={action}
          tabName={tabName}
          selectedItem={selectedItem}
          setToast={setToast}
        />

        {contentList.length > 0 ? (
          <>
            <ListTable
              openDialog={openDialog}
              columns={columns}
              contentList={itemsToDisplay}
              sx={{ marginBottom: "40px" }}
            />
            {contentList.length > PAGE_SIZE && (
              <PagesNavBar
                numOfEntries={contentList.length}
                currentPage={currentPage}
                handlePage={handlePage}
              />
            )}
          </>
        ) : (
          <p>There is no {titleTabPage} right now.</p>
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
