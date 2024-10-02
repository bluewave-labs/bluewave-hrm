import { Box, Stack } from "@mui/system";
import { styled, Typography, Select, MenuItem, Divider } from "@mui/material";
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
  const [fiscalYearMonth, setFiscalYearMonth] = useState("january");

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
        {tabName === "timeoffs" && (
          <Grid item xs={10}>
            <Stack direction="column">
              <HeadText component="h3">Fiscal year start</HeadText>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#344054",
                  lineHeight: "20px",
                  marginBottom: "16px",
                }}
              >
                Define your fiscal year start month. This affects the time off
                policies, where each time off is reset to default balance on the
                first day of each fiscal year’s month.
              </Typography>

              <Box>
                <Select
                  sx={{ width: "153px", height: "34px" }}
                  labelId="fiscalYearMonth"
                  id="fiscalYearMonth"
                  value={fiscalYearMonth}
                  label="Fiscal Year Month"
                  onChange={(e) => setFiscalYearMonth(e.target.value)}
                >
                  <MenuItem value="january">January</MenuItem>
                  <MenuItem value="february">February</MenuItem>
                  <MenuItem value="march">March</MenuItem>
                  <MenuItem value="april">April</MenuItem>
                  <MenuItem value="may">May</MenuItem>
                  <MenuItem value="june">June</MenuItem>
                  <MenuItem value="july">July</MenuItem>
                  <MenuItem value="august">August</MenuItem>
                  <MenuItem value="september">September</MenuItem>
                  <MenuItem value="october">October</MenuItem>
                  <MenuItem value="november">November</MenuItem>
                  <MenuItem value="december">December</MenuItem>
                </Select>
                <Divider sx={{ padding: "16px" }} />
              </Box>
            </Stack>
          </Grid>
        )}
        <Grid item xs={10} textAlign="center" sx={{ padding: 0 }}>
          <Stack
            direction="row"
            alignContent="center"
            justifyContent="space-between"
            sx={{ marginBottom: "24px" }}
          >
            <HeadText component="h3">{titleTabPage}</HeadText>
            <HRMButton mode="primary" onClick={() => openDialog("add")}>
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
