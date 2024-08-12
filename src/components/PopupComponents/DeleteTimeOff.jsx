import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import dayjs from "dayjs";

/**
 * Popup component for confirming a request to delete an upcoming period of time off
 * 
 * Props:
 * - period<Object>: Time off period to be deleted
 *      Syntax: {
 *          id: <Integer>
 *          timeOffId: <Integer>
 *          from: <Date>
 *          to: <Date>
 *          hours: <Float>
 *          type: <String>
 *      }
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
export default function DeleteTimeOff({period, close, refresh, style}) {
    const currentUser = 1;

    const deleteURL = `http://localhost:5000/api/timeoffhistories/${period.id}`;
    const timeOffPolicyPOSTURL = `http://localhost:5000/api/employeeannualtimeoffs/${currentUser}`;
    const timeOffPolicyPUTURL = `http://localhost:5000/api/employeeannualtimeoffs`;

    //Function for deleting a time off request
    function handleDelete() {
        //Delete the given time off request
        axios.delete(deleteURL)
        .then((response) => {
            console.log(response);
            //Retrieve the related employeeAnnualTimeOff record
            axios.post(timeOffPolicyPOSTURL)
            .then((response) => {
                console.log(response);
                const policy = response.data.filter((p) => (p.year === dayjs().year() && p.timeOffId === period.timeOffId))[0];
                const refundBalance = {
                    id: policy.id,
                    cumulativeHoursTaken: policy.hoursUsed - period.hours
                }
                //Refund the hours used in the time off request
                axios.put(timeOffPolicyPUTURL, refundBalance)
                .then((response) => {
                    console.log(response);
                    refresh();
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
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