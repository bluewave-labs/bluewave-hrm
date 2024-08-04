import { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import PeopleDetails from "./PeopleDetails";
import EmployeeForm from "../components/PeopleComponents/EmployeeForm";

/**
 * This function enables users to view employees' details. Only the administrator can view all the details.
 * @param {*} props
 * @returns React component
 */
function PeopleHome(props) {
  const { user } = props;
  const [viewOnly, setViewOnly] = useState(true); // view by default
  const [selectedEmployee, setSelectedEmployee] = useState();
  const handleClick = (data) => {
    // Add new buton or a row on the table has been clicked.
    // Update component accordingly
    setViewOnly(false);
    setSelectedEmployee(data);
  };
  return (
    <Box>
      {viewOnly && <PeopleDetails user={user} onClick={handleClick} />}
      {!viewOnly && (
        <EmployeeForm
          employee={selectedEmployee}
          onDiscard={() => {
            setViewOnly(true);


          }}
        />
      )}
    </Box>
  );
}

export default PeopleHome;
