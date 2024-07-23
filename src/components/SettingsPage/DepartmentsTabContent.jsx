import { Box, Stack } from "@mui/system";
import { styled, Typography } from "@mui/material";
import PagesNavBar from "../UpdatesPage/PagesNavBar";
import Label from "../Label/Label";
import { colors, fonts } from "../../Styles";
import { useState } from "react";
import DepartmentsTable from "./DepartmentsTable";
import HRMButton from "../Button/HRMButton";

const Text = styled(Typography)({
  fontSize: "18px",
  fontWeight: "500",
  lineHeight: "28px",
  color: " #344054",
});
export default function DepartmentsTabContent({ departments, style }) {
  const [currentPage, setCurrentPage] = useState(1); //The current page number

  //Function for changing the page number
  function handlePage(n) {
    if (n > 0 && n <= Math.ceil(departments.length / 10)) {
      setCurrentPage(n);
    }
  }

  const addDepartment = () => {
    console.log("Add new department");
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
      {/*header and table*/}
      <Stack
        direction="row"
        alignContent="center"
        justifyContent="space-between"
        style={{ marginBottom: "20px" }}
      >
        <Text>Departments</Text>
        <HRMButton mode="primary" type="button" onClick={addDepartment}>
          Add new
        </HRMButton>
      </Stack>
      <DepartmentsTable
        departments={departments}
        sx={{ marginBottom: "40px" }}
      />
      {/*header*/}
      {departments.length > 0 ? (
        <>
          {/*Upcoming time off navbar*/}
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
