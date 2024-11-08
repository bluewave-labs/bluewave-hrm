import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl,
  Select,
  Typography,
  MenuItem,
  InputBase,
  styled,
  createTheme,
  ThemeProvider,
  Dialog,
  Snackbar,
  Alert as MuiAlert ,
 } from '@mui/material'
import EndEmployeeDialog from './EndEmployeeDialog';
import ConfirmationDialog from './ConfirmationDialog';
import { useNavigate } from 'react-router-dom';


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
 


export default function ActionButtonEmployee() {
  
  // Create a custom theme to override typography styles
  const customTheme = createTheme({
    
    typography: {
     
      h2: {
        fontWeight: 600,
        fontFamily: 'Inter',
        fontSize: '16px',
        color: '#101828',
      },
      body1: {
        fontWeight: 600,
        fontFamily: 'Inter',
        fontSize: '13px',
        color: '#344054',
      },
      body2: {
        fontWeight: 550,
        fontFamily: 'Inter',
        fontSize: '14px',
        color: '#101828',
      },
      body3: {
        fontWeight: 550,
        fontFamily: 'Inter',
        fontSize: '12px',
        color: '#475467',
      },
      body4: {
        fontWeight: 550,
        fontFamily: 'Inter',
        fontSize: '12px',
        color: '#344054',
      },
      body5: {
        fontWeight: 400,
        fontFamily: 'Inter',
        fontSize: '13px',
        color: '#344054',
        padding: '9px, 10px, 9px, 10px',
      },
      body6: {
        fontWeight: 400,
        fontFamily: 'Inter',
        fontSize: '13px',
        color: '#667085',
        marginLeft: '15px',
        padding: '9px, 10px, 9px, 10px',
      },
    },
  });

  // Custom styling for InputBase component used in the Select component
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    height: '34px',
    
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: '8px',
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #D0D5DD',
      fontSize: 13,
      //height: '34px',
      minHeight: '34px', 
      padding: '0px',
      display: 'flex',
      alignItems: 'center',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: 'Inter',
      '&:focus': {
        borderRadius: 8,
        borderColor: '#D0D5DD',
      },
     
    },
  }));
  const navigate = useNavigate();
  const [empId, setEmpId] = useState(null); // Add empId state
  const [action, setAction] = useState('');
  const [openEndEmployeeDialog, setOpenEndEmployeeDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [dialogData,setDialogData] = useState ({
    Option:'',
    Date:null,
    Notes:'',
    Reason:'',
    empId: 'null',
  })

  // Function to handle changes in the Select component
  const handleChange = (event) => {
    const selectedAction = event.target.value;
    setAction(selectedAction);

    // Open the dialog if "End employment" is selected
    if (selectedAction === 30) { 

      setEmpId('5');
      setOpenEndEmployeeDialog(true); 

    }else if (selectedAction === 10) { 

      setEmpId('5');
      navigate('/myinfoedit');

    } else{
      navigate('/myinfoedit');
    }  

  };

  // Close   "End employment" dialog
  const handleCloseEndEmployeeDialog = () => {
    setOpenEndEmployeeDialog(false);
    setDialogData({ Option: '', Date: null, Notes: '', Reason: '', empId: null });
    setAction(''); // Select is null
    
  };

  // Open confirmation dialog
  const handleOpenConfirmationDialog = (data) => {
    setDialogData(data);
    setOpenEndEmployeeDialog(false);
    setOpenConfirmationDialog(true);
  };

  //Close Confirmation dialog and open end employee dialog
  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setOpenEndEmployeeDialog(true);
  };

  // Close dialogs and open successpopu for 5 seconds.
  const handleConfirm = async () => {
    

    //Close dialogs and open success popup for 5 seconds
    setOpenConfirmationDialog(false);
    setOpenEndEmployeeDialog(false);
    setOpenSuccessPopup(true);
    setTimeout(() => {
      setOpenSuccessPopup(false);
      window.location.reload();
    }, 5000); // 5 seconds

    setAction(''); // Select  is null
  };


  return (
    <ThemeProvider theme={customTheme}>
    
    <FormControl sx={{ width: '195px' }}>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      backgroundColor: "transparent", 
                    },
                  
                    '&.Mui-focused': {
                            backgroundColor: "transparent !important",
                        },
                    "&.Mui-selected": {
                      backgroundColor: "transparent !important", 
                      "&:hover": {
                        backgroundColor: "transparent !important", 
                      },
                      "&:active": {
                      backgroundColor: "transparent !important", 
                    },
                    },
                  },
                },
              },
            }}
            displayEmpty
            value={action}
            onChange={handleChange}
            input={<BootstrapInput />}
            renderValue={(selected) => {
              return <Typography variant="body6">Action</Typography>;
            }}
           
          >
            {/* MenuItem for selecting "Send exit survey" */}
            <MenuItem value={10}><Typography variant="body5">Edit Employee</Typography></MenuItem>
          
            {/* MenuItem for selecting "Send exit survey" */}
            <MenuItem selected value={20}><Typography variant="body5">Send exit survey</Typography></MenuItem>
            
            {/* MenuItem for selecting "End employment" */}
            <MenuItem value={30}><Typography variant="body5">End employment</Typography></MenuItem>
          </Select>
    </FormControl>
        <EndEmployeeDialog 
          open={openEndEmployeeDialog}
          onClose={handleCloseEndEmployeeDialog}
          openConfirmationDialog={handleOpenConfirmationDialog} 
          empId={empId}
        />
        <Dialog open={openConfirmationDialog} onClose={handleCloseConfirmationDialog}>
          <ConfirmationDialog 
            closeConfirmationDialog={handleCloseConfirmationDialog} 
            onConfirm={handleConfirm}
            data={dialogData}
            empId={empId}
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
        
        
    </ThemeProvider>
  )
}

ActionButtonEmployee.propTypes = {
    empId : PropTypes.number.isRequired
}

