import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/system';
import dayjs from 'dayjs';
import DateSelect from './DateSelect';
import Checkbox from '../Checkbox/Checkbox';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

//Function for determining if a time period is valid. A time period is only valid if the 
//starting date is before or on the same day as the ending date.
function isValidPeriod(from, to) {
    if (from.getFullYear() < to.getFullYear()) {
        return true;
    }
    else if (from.getFullYear() === to.getFullYear()) {
        if (from.getMonth() < to.getMonth()) {
            return true;
        }
        else if (from.getMonth() === to.getMonth()) {
            return from.getDate() <= to.getDate()
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};

//Function for parsing a JavaScript date into a string format.
function formatDate(date) {
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return `${month} ${day}, ${year}`;
};

/**
 * Popup component for displaying the form for submitting a time off request. Includes controls
 * for setting the time off policy, the length of the time off period and the amount of time
 * off per day.
 * 
 * Props:
 * - close<Function>: Function for closing this popup component.
 *      Syntax: close()
 * 
 * - sendRequest<Function>: Function for submitting a time off request.
 *      Syntax: sendRequest()
 * 
 * - initialRequest<Object>: When editing a time off request, this object shows the original
 *      details of the request
 *      Syntax: {
 *          startDate: <Date>
 *          endDate: <Date>
 *          type: <String>
 *      }
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffRequest({close, sendRequest, initialRequest, style}) {
    //Time off starting and ending dates
    const [from, setFrom] = useState(initialRequest ? initialRequest.startDate : dayjs().toDate());
    const [to, setTo] = useState(initialRequest ? initialRequest.endDate : dayjs().toDate());
    //States determining whether the menus for setting dates should be open
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    //Flag determining if the amount of time off should be set for each day or for just the
    //starting and ending dates 
    const [eachDay, setEachday] = useState(false);          

    //Automatically adjust dates to ensure a valid period is set
    useEffect(() => {
        if (!isValidPeriod(from, to)) {
            setTo(from);
        }
    }, [from]);

    useEffect(() => {
        if (!isValidPeriod(from, to)) {
            setFrom(to);
        }
    }, [to]);

    //Custom style elements
    const TableHeaderCell = styled(TableCell)({
        color: colors.darkGrey, 
        paddingTop: "10px",
        paddingBottom: "10px"
    });

    const TableBodyCell = styled(TableCell)({
        color: colors.darkGrey,
        paddingTop: "25px",
        paddingBottom: "25px"
    });

    const StyledChip = styled(Chip)({
        border: "1px solid #EAECF0",
        backgroundColor: "#F9FAFB"
    });

    //List of time off policies
    const timeOffCategories = [
        "Vacation - left: 15 days (180 hours)",
        "Sick - left: 15days (180 hours)",
        "Bereavement - left: 0 days (0 hours)"
    ];
    
    //Date range for setting full and half days off
    const dateRange = [];
    for (let d = new Date(from); isValidPeriod(d, to) ; d.setDate(d.getDate() + 1)) {
        dateRange.push(new Date(d));
    }

    return (
        <Box sx={{...{
            borderRadius: "12px",
            boxShadow: "0 15px 6px #10182808",
            paddingX: "36px",
            paddingY: "30px",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Title*/}
            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="space-between"
                sx={{
                    marginBottom: "30px"
                }}
            >
                {(initialRequest) ? <h3>Edit my time off</h3> : <h3>Request new time off</h3>}
                <CloseIcon onClick={close} sx={{
                    backgroundColor: "#FFFFFFF",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#D0D5DD"
                    }
                }}/>
            </Stack>
            {/*Set time off category*/}
            <h4>Time off category</h4>
            <Autocomplete 
                disablePortal 
                options={timeOffCategories} 
                getOptionDisabled={(option) => option === timeOffCategories[2]}
                renderInput={(params) => <TextField {...params} placeholder="Time off category" />}
                sx={{
                    width: "100%",
                    marginBottom: "40px"
                }}
            />
            {/*Set starting and ending dates of time off period*/}
            <Stack 
                direction="row" 
                alignItems="center"
                spacing={4}
                sx={{marginBottom: "40px"}}
            >
                <Box>
                    <h4>From</h4>
                    <Chip 
                        icon={<CalendarMonthIcon />} 
                        label={formatDate(from)} 
                        variant="outlined" 
                        onClick={() => setOpenFrom(true)}
                        sx={{borderRadius: "4px"}}
                    />
                </Box>
                <Box>
                    <h4>To</h4>
                    <Chip 
                        icon={<CalendarMonthIcon />} 
                        label={formatDate(to)} 
                        variant="outlined" 
                        onClick={() => setOpenTo(true)}
                        sx={{borderRadius: "4px"}}
                    />
                </Box>
            </Stack>
            {/*Set amount of time off per day*/}
            <h4>Amount</h4>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Checkbox 
                    type="checkbox" 
                    id="setHours" 
                    name="setHours" 
                    value="setHours" 
                    size="large"
                    onChange={() => setEachday(!eachDay)}
                    style={{marginRight: "10px"}} 
                />
                <p>Set hours for each day during the time off period</p>
            </Stack>
            {/*Time off per day table*/}
            <TableContainer sx={{width: "100%", maxHeight: "260px", marginY: "20px", overflowY: "auto"}}>
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: "#F9FAFB"}}>
                            <TableHeaderCell><b>Day</b></TableHeaderCell>
                            <TableHeaderCell align="center"><b>Full day</b></TableHeaderCell>
                            <TableHeaderCell align="center"><b>Half day</b></TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(eachDay) ? dateRange.map((date) => (
                            <TableRow>
                                <TableBodyCell>
                                    <StyledChip label={<b>{formatDate(date)}</b>} />
                                </TableBodyCell>
                                <TableBodyCell align="center">
                                    <Checkbox 
                                        type="radio" 
                                        id={`${formatDate(date)}-full`}
                                        name={formatDate(date)}
                                        value="full" 
                                        checked={true}
                                    />
                                </TableBodyCell>
                                <TableBodyCell align="center">
                                    <Checkbox 
                                        type="radio" 
                                        id={`${formatDate(date)}-half`} 
                                        name={formatDate(date)}
                                        value="half" 
                                    />
                                </TableBodyCell>
                            </TableRow>
                        )) : (
                            <>
                                {dateRange.length > 0 &&
                                    <TableRow>
                                        <TableBodyCell>
                                            <StyledChip label={<b>{formatDate(dateRange[0])}</b>} />
                                        </TableBodyCell>
                                        <TableBodyCell align="center">
                                            <Checkbox 
                                                type="radio" 
                                                id={`${formatDate(dateRange[0])}-full`}
                                                name={formatDate(dateRange[0])}
                                                value="full" 
                                                checked={true}
                                            />
                                        </TableBodyCell>
                                        <TableBodyCell align="center">
                                            <Checkbox 
                                                type="radio"
                                                id={`${formatDate(dateRange[0])}-half`}
                                                name={formatDate(dateRange[0])}
                                                value="half"
                                            />
                                        </TableBodyCell>
                                    </TableRow>
                                }
                                {dateRange.length > 1 &&
                                    <TableRow>
                                        <TableBodyCell>
                                            <StyledChip label={<b>{formatDate(dateRange[dateRange.length - 1])}</b>} />
                                        </TableBodyCell>
                                        <TableBodyCell align="center">
                                            <Checkbox 
                                                type="radio" 
                                                id={`${formatDate(dateRange[dateRange.length - 1])}-full`}
                                                name={formatDate(dateRange[dateRange.length - 1])}
                                                value="full" 
                                                checked={true}
                                            />
                                        </TableBodyCell>
                                        <TableBodyCell align="center">
                                            <Checkbox 
                                                type="radio"
                                                id={`${formatDate(dateRange[dateRange.length - 1])}-half`}
                                                name={formatDate(dateRange[dateRange.length - 1])}
                                                value="half"
                                            />
                                        </TableBodyCell>
                                    </TableRow>
                                }
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*Time off summary*/}
            <p style={{marginBottom: "30px"}}>
                2 full days (16 hrs) and 1 half day (4hrs) will be requested (20hrs in total).
            </p>
            {/*Send or cancel*/}
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={3}>
                <HRMButton mode="secondaryB" onClick={close}>Cancel</HRMButton>
                {(initialRequest) ?
                <HRMButton mode="primary" onClick={sendRequest}>Update</HRMButton> :
                <HRMButton mode="primary" onClick={sendRequest}>Send</HRMButton>}
            </Stack>
            {/*Popup components for setting starting and ending dates*/}
            <Dialog open={openFrom} onClose={() => setOpenFrom(false)}>
                <DateSelect close={() => setOpenFrom(false)} setDate={setFrom} />
            </Dialog>
            <Dialog open={openTo} onClose={() => setOpenTo(false)}>
                <DateSelect close={() => setOpenTo(false)} setDate={setTo} />
            </Dialog>
        </Box>
    );
};

//Control panel settings for storybook
TimeOffRequest.propTypes = {
    //The function to close this component
    close: PropTypes.func,

    //The function to send the request and close this component
    sendRequest: PropTypes.func
};

//Default values for this component
TimeOffRequest.defaultProps = {
    initialRequest: null,
    style: {}
};