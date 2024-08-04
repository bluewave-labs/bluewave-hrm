import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import HRMButton from '../Button/HRMButton';
import { fonts, colors } from '../../Styles';
import PropTypes from 'prop-types';

/**
 * Popup component for displaying the details of a new employee
 * 
 * Props:
 * - employee_details<Object>: Details about the new employee
 *      Syntax: {
 *          name: <String>
 *          avatar: <Image Source>
 *          role: <String>
 *          email: <String>
 *          office: <String>
 *          effectiveDate: <Date>
 *      }
 * 
 * - close<Function>: Function for closing this popup component
 *      Syntax: close()
 * 
 * - style<Object>: Optional prop for adding further inline styling
 *      Default: {}
 */
export default function NewTeamMember({employee_details, close, style}) {
    //Custom style elements
    const StyledTD = styled("td")({
        textAlign: "start",
        width: "50%",
        paddingBottom: "20px"
    });

    return (
        <Box sx={{...{
            width: "506px",
            minHeight: "449px",
            borderRadius: "12px",
            boxShadow: "0 15px 6px #10182808",
            color: colors.darkGrey,
            backgroundColor: "#FFFFFF",
            padding: "40px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Title*/}
            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="space-between"
                sx={{marginBottom: "40px"}}
            >
                <h3>We have a new employee</h3>
                <CloseIcon onClick={close} sx={{
                    backgroundColor: "#FFFFFF",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#D0D5DD"
                    }
                }}/>
            </Stack>
            {/*Employee details*/}
            {(Object.keys(employee_details).length > 0) ?
                <>
                    <table style={{width: "100%", marginBottom: "40px"}}>
                        <tr>
                            <StyledTD><b>Photo</b></StyledTD>
                            <StyledTD>
                                <Avatar 
                                    alt={employee_details.name} 
                                    src={employee_details.avatar} 
                                    sx={{width: "60px", height: "60px"}}
                                />
                            </StyledTD>
                        </tr>
                        <tr>
                            <StyledTD><b>Name</b></StyledTD>
                            <StyledTD>{employee_details.name}</StyledTD>
                        </tr>
                        <tr>
                            <StyledTD><b>Role</b></StyledTD>
                            <StyledTD>{employee_details.role}</StyledTD>
                        </tr>
                        <tr>
                            <StyledTD><b>Email</b></StyledTD>
                            <StyledTD>{employee_details.email}</StyledTD>
                        </tr>
                        <tr>
                            <StyledTD><b>Office</b></StyledTD>
                            <StyledTD>{employee_details.office}</StyledTD>
                        </tr>
                        <tr>
                            <StyledTD><b>Effective date</b></StyledTD>
                            <StyledTD>{employee_details.effectiveDate}</StyledTD>
                        </tr>
                    </table>
                    {/*Buttons*/}
                    <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                        <HRMButton mode="tertiary" onClick={close}>Dismiss</HRMButton>
                        <HRMButton mode="primary">See employee details</HRMButton>
                    </Stack>
                </> :
                <CircularProgress color="inherit" sx={{marginX: "47%", marginTop: "20%"}} />
            }
        </Box>
    );
};

//Control panel settings for storybook
NewTeamMember.propTypes = {
    //Details about the new employee
    employee_details: PropTypes.objectOf(PropTypes.string),

    //Function for closing this popup
    close: PropTypes.func
};

//Default values for this component
NewTeamMember.defaultProps = {
    style: {}
}