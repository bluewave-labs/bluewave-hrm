import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * Popup component for confirming a request to delete an upcoming period of time off
 * 
 * Props:
 * - timeOffId<Integer>: Primary key of the corresponding time off period to be deleted.
 * 
 * - close<Function>: Function for closing this popup component.
 *      Syntax: close()
 * 
 * - refresh<Function>: Function for refreshing the list of time off periods in the parent 
 *      component.
 *      Syntax: refresh()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function DeleteTimeOff({timeOffId, close, refresh, style}) {
    const url = `http://localhost:5000/api/timeoffhistories/${timeOffId}`;

    function handleDelete() {
        axios.delete(url)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
        refresh();
    }

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
    //Primary key of the corresponding time off period to be deleted.
    timeOffId: PropTypes.number,

    //The function to close this component
    close: PropTypes.func,

    //Function for refreshing the list of time off periods in the parent component.
    refresh: PropTypes.func
};

//Default values for this component
DeleteTimeOff.defaultProps = {
    style: {}
};