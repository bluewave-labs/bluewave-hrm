import { useState } from "react";
import { Box } from "@mui/material";
import PeopleDetails from "./PeopleDetails";
import EmployeeForm from "../components/PeopleComponents/EmployeeForm";
import EmployeeSnackbar from "../components/PeopleComponents/Snackbar";
import ActionButtonEmployee from "../components/PeopleComponents/EndEmployment";
/**
 * This function enables users to view employees' details. Only the administrator can view all the details.
 * @param {*} props
 * @returns React component
 */
function PeopleHome() {
  const [viewOnly, setViewOnly] = useState(true); // view by default
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [alert, setAlert] = useState({ show: false });
  const [openEndEmployment, setOpenEndEmployment] = useState(false);
  const handleEdit = (data) => {
    setViewOnly(false);
    setSelectedEmployee(data);
  };

  const handleTermination = (data) => {
    setOpenEndEmployment(true);
    setSelectedEmployee(data);
  };
  
  const handleSurvey = (data) => {
    const empId = data ? data.empId : -1;
    console.log("handleSurvey clicked - empId", empId);
  };

  const handleAddNewEmployee = () => {
    setViewOnly(false);
    setSelectedEmployee(null);
  };

  return (
    <Box>
      {openEndEmployment && (
        <ActionButtonEmployee
          empId={selectedEmployee && selectedEmployee.empId}
          open={openEndEmployment}
          onClose={setOpenEndEmployment}
        />
      )}
      {viewOnly && (
        <Box>
          <EmployeeSnackbar isOpen={alert.show} message={alert.message} />
          <PeopleDetails
            handleSurvey={handleSurvey}
            handleTermination={handleTermination}
            handleEdit={handleEdit}
            handleAddNewEmployee={handleAddNewEmployee}
          />
        </Box>
      )}
      {!viewOnly && (
        <EmployeeForm
          employee={selectedEmployee}
          onDiscard={() => {
            setViewOnly(true);
            setAlert({
              show: false,
              message: "",
            });
          }}
          onSave={() => {
            setViewOnly(true);
            setAlert({
              show: true,
              message: selectedEmployee
                ? `Record successfully updated.`
                : `Employee successfully added.`,
            });
          }}
        />
      )}
    </Box>
  );
}

export default PeopleHome;
