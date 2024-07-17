import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import PagesNavBar from "../UpdatesPage/PagesNavBar";
import Label from "../Label/Label";
import { colors, fonts } from "../../Styles";
import { useState } from "react";
import PropTypes from "prop-types";
import DepartmentsTable from "./DepartmentsTable";

/**
 * Displays the content for the Board tab in the time off menu which includes the available
 * time off per policy and any upcoming periods of time off scheduled.
 *
 * Props:
 * - policies<Array<Object>>: List of objects containing policy information to be displayed.
 *
 * - timeOffPeriods<Array<Object>>: List of objects containing information of upcoming periods
 *      of time off.
 *
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function DepartmentsTabContent({ departments, style }) {
  const [currentPage, setCurrentPage] = useState(1); //The current page number

  //Function for changing the page number
  function handlePage(n) {
    if (n > 0 && n <= Math.ceil(departments.length / 10)) {
      setCurrentPage(n);
    }
  }

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
      <h3 style={{ marginBottom: "40px" }}>Departments</h3>
      <DepartmentsTable departments={departments} sx={{ marginBottom: "40px" }} />
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

//Control panel settings for storybook
DepartmentsTabContent.propTypes = {
  //Time off departments to be displayed
  departments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

//Default values for this component
DepartmentsTabContent.defaultProps = {
  style: {},
};
