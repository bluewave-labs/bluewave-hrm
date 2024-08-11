import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';
import PropTypes from 'prop-types';

/**
 * Popup component for confirming a request to delete an upcoming period of time off
 * 
 * Props:
 * - handleDelete<Function>: Function for cancelling a time off request.
 *      Syntax: handleDelete()
 * 
 * - close<Function>: Function for closing this popup component.
 *      Syntax: close()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function DeleteTimeOff({handleDelete, close, style}) {
    return (
        <Box sx={{...{
            width: "411px",
            borderRadius: "12px",
            boxShadow: "0 15px 6px #10182808",
            paddingX: "36px",
            paddingY: "30px",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Text*/}
            <h3>Delete time off request?</h3>
            <p style={{marginBottom: "40px"}}>
                When you remove this time off request, a confirmation message will be sent 
                to your manager
            </p>
            {/*Buttons*/}
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                <HRMButton mode="tertiary" onClick={close}>Cancel</HRMButton>
                <HRMButton mode="error" onClick={handleDelete}>Remove</HRMButton>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
DeleteTimeOff.propTypes = {
    //The function to delete this time off request
    handleDelete: PropTypes.func,

    //The function to close this component
    close: PropTypes.func
};

//Default values for this component
DeleteTimeOff.defaultProps = {
    style: {}
};