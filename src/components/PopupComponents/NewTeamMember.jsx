import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import HRMButton from '../Button/HRMButton';
import { fonts, colors } from '../../Styles';
import PropTypes from 'prop-types';

export default function NewTeamMember({employee_details, close, style}) {
    const StyledTD = styled("td")({
        textAlign: "start",
        width: "50%",
        paddingBottom: "20px"
    });

    return (
        <Box sx={{...{
            width: "490px",
            borderRadius: "12px",
            boxShadow: "0 15px 6px #10182808",
            color: colors.darkGrey,
            backgroundColor: "#FFFFFF",
            padding: "40px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
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
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                <HRMButton mode="tertiary" onClick={close}>Dismiss</HRMButton>
                <HRMButton mode="primary">See employee details</HRMButton>
            </Stack>
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