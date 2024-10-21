import { useState } from "react";
import { Box } from "@mui/material";
import PeopleDetails from "./PeopleDetails";
import EmployeeForm from "../components/PeopleComponents/EmployeeForm";
import EmployeeSnackbar from "../components/PeopleComponents/Snackbar";
import { 
  styled,
  //createTheme,
  //ThemeProvider,
  Dialog,
  Snackbar,
  Alert as MuiAlert ,
} from '@mui/material';
import EndEmployeeDialog from '../components/actionbutton/EndEmployeeDialog';
import ConfirmationDialog from '../components/actionbutton/ConfirmationDialog';

const api = require("../assets/FetchServices");

const StyledAlert = styled(MuiAlert)(({ theme }) => ({
  border:'solid 1px #D0D5DD',
  borderRadius:'12px',
  backgroundColor: '#FFFFFF', // white background
  color: '#475467', // close icon color

  '& .MuiAlert-message': {
    fontSize: '13px', // adjust font size 
    color: '#475467', // gray text color
    
  },
  '& .MuiAlert-icon': {
    display: 'none', // hide the icon
  },
}));

/**
 * This function enables users to view employees' details. Only the administrator can view all the details.
 * @param {*} props
 * @returns React component
 */

function PeopleHome() {
  const [viewOnly, setViewOnly] = useState(true); // view by default
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [alert, setAlert] = useState({ show: false });
  const [openEndEmployeeDialog, setOpenEndEmployeeDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [dialogData,setDialogData] = useState ({
    Option:'',
    Date:null,
    Notes:'',
    Reason:'',
    empId: '',
  })

  const handleEdit = (data) => {
    setViewOnly(false);
    setSelectedEmployee(data);
  };

  const handleTermination = (data) => {
    const empId = data ? data.empId : -1;
    setDialogData((prevData) => ({
      ...prevData,
      empId: empId,
    }))
   
    setOpenEndEmployeeDialog(true); 
    console.log("handleTermination clicked - empId", empId);
  };

  // Close   "End employment" dialog
  const handleCloseEndEmployeeDialog = () => {
    setOpenEndEmployeeDialog(false);
    setDialogData({ Option: '', Date: null, Notes: '', Reason: '', empId: null });
    //setAction(''); // Select is null
    
  };

  // Open confirmation dialog
  const handleOpenConfirmationDialog = (data) => {
    setDialogData((prevData) => ({
      ...prevData,
      ...data,
    }));
    setOpenEndEmployeeDialog(false);
    setOpenConfirmationDialog(true);
  };

  //Close Confirmation dialog and open end employee dialog
  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setOpenEndEmployeeDialog(true);
  };

  const handleConfirm = async () => {
    console.log('data from firstdialog', dialogData);
    try {
     
      const terminatedEmployee = await api.employee.remove(dialogData);
      if (terminatedEmployee) {
        console.log('Employee terminated successfully:', terminatedEmployee);
        //Close dialogs and open success popup for 5 seconds
        setOpenConfirmationDialog(false);
        setOpenEndEmployeeDialog(false);
        setOpenSuccessPopup(true);
        setTimeout(() => {
          setOpenSuccessPopup(false);
          window.location.reload();
        }, 5000); // 5 seconds
    } else {
        console.error('Employee termination failed');
    }
    // Handle successful response (if needed)
    } catch (error) {
      console.error('Error occurred while sending data to the API:', error);
    }

    

    //setAction(''); // Select  is null
  };

  const handleSurvey = (data) => {
    const empId = data ? data.empId : -1;
    console.log("handleSurvey clicked - empId", empId);
  };

  const handleAddNewEmployee = () => {
    setViewOnly(false);
    setSelectedEmployee(null);
  };

  const handleClick = (data) => {
    // Add new button or a row on the table has been clicked.
    // Update component accordingly
    setViewOnly(false);
    setSelectedEmployee(data);
  };

  return (
    <Box>
      {viewOnly && (
        <Box>
          <EmployeeSnackbar isOpen={alert.show} message={alert.message} />
          <PeopleDetails
            handleSurvey={handleSurvey}
            handleTermination={(employeeData) => handleTermination(employeeData)}
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
      <EndEmployeeDialog 
        open={openEndEmployeeDialog}
        onClose={handleCloseEndEmployeeDialog}
        openConfirmationDialog={handleOpenConfirmationDialog} 
        //empId={empId}
        dialogData = {dialogData}
      />
        <Dialog open={openConfirmationDialog} onClose={handleCloseConfirmationDialog}>
          <ConfirmationDialog 
            closeConfirmationDialog={handleCloseConfirmationDialog} 
            onConfirm={handleConfirm}
            data={dialogData}
            //empId={empId}
          />
        </Dialog>
        <Snackbar
          open={openSuccessPopup}
          autoHideDuration={5000}
          onClose={() => setOpenSuccessPopup(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
        <StyledAlert onClose={() => setOpenSuccessPopup(false)} >
          Employee termination successful!
        </StyledAlert>
      </Snackbar>
    </Box>
  );
}

export default PeopleHome;
