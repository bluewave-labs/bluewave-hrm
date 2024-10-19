import { useContext, useState } from "react";
import { Box } from "@mui/material";
import PeopleDetails from "./PeopleDetails";
import EmployeeForm from "../components/PeopleComponents/EmployeeForm";
import EmployeeSnackbar from "../components/PeopleComponents/Snackbar";
import ActionButtonEmployee from "../components/PeopleComponents/EndEmployment";
import StateContext from "../context/StateContext";

/**
 * This function enables users to view employees' details. Only the administrator can view all the details.
 * @param {*} props
 * @returns React component
 */
function PeopleHome() {
  const stateContext = useContext(StateContext);
  const [viewOnly, setViewOnly] = useState(true); // view by default
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [alert, setAlert] = useState({ show: false });
  const [openEndEmployment, setOpenEndEmployment] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const handleEdit = (data) => {
    setViewOnly(false);
    setSelectedEmployee({ ...data });
  };

  const handleTermination = (data) => {
    setOpenEndEmployment(true);
    setSelectedEmployee(data);
  };

  const handleSurvey = (data) => {
    const empId = data ? data.empId : -1;
    console.log("handleSurvey clicked - empId", empId);
    //Backend function call goes here
    setLinkSent(true); // if the operation is successful
    setTimeout(() => {
      setLinkSent(false); // reset the variable
    }, 5000);
  };

  const handleAddNewEmployee = () => {
    setViewOnly(false);
    setSelectedEmployee(null);
  };

  const handleSave = () => {
    setViewOnly(true);
    const alertData = {
      show: true,
      message: selectedEmployee
        ? `Record successfully updated.`
        : `Employee successfully added.`,
    };
    setAlert(alertData);
    stateContext.updateState("pdEmployees", null); // Force reload of data
  };
  return (
    <Box>
      {linkSent && (
        <EmployeeSnackbar
          isOpen={true}
          message={"Offboarding link has been sent to the user email"}
        />
      )}
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
              show: false,
              message: "",
            });
          }}
          onSave={handleSave}
        />
      )}
    </Box>
  );
}

export default PeopleHome;
