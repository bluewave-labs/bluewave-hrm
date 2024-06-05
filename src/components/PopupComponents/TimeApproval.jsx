import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';

/**
 * Popup component for displaying the information of a time off request and the options to reject
 * or approve it to an administrator
 * 
 * Props:
 * - user_information<Object>: Contains the request information.
 *      Syntax: {
 *          avatar: <image source>
 *          name: <String>
 *          role: <String>
 *          email: <String>
 *          effectiveDate: <String>
 *          timeOffBalance: <String>
 *          timeOffRequested: <String>
 *          requestedDaysTotal: <String>
 *          timeOffCategory: <String>
 *          description: <String>
 *      }
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function TimeApproval({user_information, style}) {
    const StyledTD = styled('td')({
        textAlign: "start",
        paddingBottom: "15px"
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
                <h2>Approve new time off</h2>
                <CloseIcon sx={{
                    backgroundColor: "#FFFFFFF",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#D0D5DD"
                    }
                }}/>
            </Stack>
            {/*Request Information*/}
            <table style={{width: "100%"}}>
                <tr>
                    <StyledTD><b>Photo</b></StyledTD>
                    <StyledTD>
                        <Avatar 
                            alt={user_information.name} 
                            src={user_information.avatar} 
                            sx={{
                                width: "60px",
                                height: "60px"
                            }}
                        />
                    </StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Name</b></StyledTD>
                    <StyledTD>{user_information.name}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Role</b></StyledTD>
                    <StyledTD>{user_information.role}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Email</b></StyledTD>
                    <StyledTD>{user_information.email}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Office</b></StyledTD>
                    <StyledTD>{user_information.office}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Effective date</b></StyledTD>
                    <StyledTD>{user_information.effectiveDate}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Time off balance</b></StyledTD>
                    <StyledTD>{user_information.timeOffBalance}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Time off requested</b></StyledTD>
                    <StyledTD>{user_information.timeOffRequested}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Requested days total</b></StyledTD>
                    <StyledTD>{user_information.requestedDaysTotal}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Time-off category</b></StyledTD>
                    <StyledTD>{user_information.timeOffCategory}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Description</b></StyledTD>
                    <StyledTD>{user_information.description}</StyledTD>
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
            {/*Reject or approve*/}
            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="flex-end"
                spacing={2}
            >
                <HRMButton mode="error">Reject</HRMButton>
                <HRMButton mode="primary">Approve</HRMButton>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
TimeApproval.propTypes = {};

//Default values for this component
TimeApproval.defaultProps = {
    style: {}
};