import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';
import PropTypes from 'prop-types';

/**
 * Popup component for displaying the information of a time off request and the options to reject
 * or approve it to an administrator.
 * 
 * Props:
 * - request_information<Object>: Contains the request information.
 *      Syntax: {
 *          avatar: <Image Source>
 *          name: <String>
 *          role: <String>
 *          email: <String>
 *          office: <String>
 *          effectiveDate: <String>
 *          timeOffBalance: <String>
 *          timeOffRequested: <String>
 *          requestedDaysTotal: <String>
 *          timeOffCategory: <String>
 *      }
 * 
 * - close<Function>: Function for closing this popup component
 *      Syntax: close()
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function TimeOffApproval({request_information, close, style}) {
    //Custom style elements
    const StyledTD = styled('td')({
        textAlign: "start",
        paddingBottom: "15px",
        width: "50%"
    });

    return (
        <Box sx={{...{
            width: "524px",
            borderRadius: "12px",
            boxShadow: "0 15px 6px #10182808",
            padding: "40px",
            fontFamily: fonts.fontFamily,
            color: colors.darkGrey
        }, ...style}}>
            {/*Title*/}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <h3>Approve new time off</h3>
                <CloseIcon onClick={close} sx={{
                    backgroundColor: "#FFFFFFF",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#D0D5DD"
                    }
                }}/>
            </Stack>
            {/*Request Information*/}
            <table style={{width: "100%", marginBottom: "40px"}}>
                <tr>
                    <StyledTD><b>Photo</b></StyledTD>
                    <StyledTD>
                        <Avatar 
                            alt={request_information.name} 
                            src={request_information.avatar} 
                            sx={{width: "60px", height: "60px"}}
                        />
                    </StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Name</b></StyledTD>
                    <StyledTD>{request_information.name}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Role</b></StyledTD>
                    <StyledTD>{request_information.role}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Email</b></StyledTD>
                    <StyledTD>{request_information.email}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Office</b></StyledTD>
                    <StyledTD>{request_information.office}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Effective date</b></StyledTD>
                    <StyledTD>{request_information.effectiveDate}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Time off balance</b></StyledTD>
                    <StyledTD>{request_information.timeOffBalance}</StyledTD>
                </tr>
            </table>
            <table style={{width: "100%"}}>
                <tr>
                    <StyledTD><b>Time off requested</b></StyledTD>
                    <StyledTD>{request_information.timeOffRequested}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Requested days total</b></StyledTD>
                    <StyledTD>{request_information.requestedDaysTotal}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Time-off category</b></StyledTD>
                    <StyledTD>{request_information.timeOffCategory}</StyledTD>
                </tr>
            </table>
            {/*Admin's notes*/}
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <b style={{marginTop: "40px", marginBottom: "15px"}}>Your Notes</b>
                <TextField 
                    rows={4} 
                    multiline 
                    sx={{
                        border: "1px solid #D0D5DD", 
                        borderRadius: "8px",
                        marginBottom: "40px"
                    }} 
                />
            </Box>
            {/*Reject, approve or close*/}
            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="flex-end"
                spacing={2}
            >
                <HRMButton mode="tertiary" onClick={close}>Cancel</HRMButton>
                <HRMButton mode="error">Reject</HRMButton>
                <HRMButton mode="primary">Approve</HRMButton>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
TimeOffApproval.propTypes = {
    //Information included in the time off request
    request_information: PropTypes.objectOf(PropTypes.string)
};

//Default values for this component
TimeOffApproval.defaultProps = {
    style: {}
};