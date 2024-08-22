import { Box, Stack } from "@mui/system";
import { styled, Typography, TextField } from "@mui/material";
import PagesNavBar from "../UpdatesPage/PagesNavBar";
import { useMemo, useState } from "react";
import Grid from "@mui/system/Unstable_Grid";
import PermissionsTable from "./PermissionsTable";
import { useForm } from "react-hook-form";

const HeadText = styled(Typography)({
  fontSize: "18px",
  lineHeight: "28px",
  color: "#101828",
  fontWeight: "500",
});

const PAGE_SIZE = 10;

export default function ManagePermissions({
  columns,
  contentList,
  titleTabPage,
  style,
}) {
  const { register } = useForm();

  const [currentPage, setCurrentPage] = useState(1);

  const itemsToDisplay = useMemo(
    () =>
      contentList.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [currentPage, contentList]
  );

  const handlePage = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(contentList.length / PAGE_SIZE)
    ) {
      setCurrentPage(pageNumber);
    }
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
            <TextField
              placeholder="Search employee name"
              sx={{ width: "200px" }}
              size="small"
              fullWidth
              color="secondary"
              {...register("employeeName")}
            />
          </Stack>
        </Grid>

        {contentList.length > 0 ? (
          <>
            <PermissionsTable
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
      </Grid>
    </Box>
  );
}
