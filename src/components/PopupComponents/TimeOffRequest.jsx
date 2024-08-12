import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";
import DateSelect from "./DateSelect";
import Checkbox from "../Checkbox/Checkbox";
import HRMButton from "../Button/HRMButton";
import TimeOffTable from "./TimeOffTable";
import { colors, fonts } from "../../Styles";
import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import axios from 'axios';

//Function for determining if a time period is valid. A time period is only valid if the
//starting date is before or on the same day as the ending date.
function isValidPeriod(from, to) {
    if (from.getFullYear() < to.getFullYear()) {
        return true;
    } else if (from.getFullYear() === to.getFullYear()) {
        if (from.getMonth() < to.getMonth()) {
        return true;
        } else if (from.getMonth() === to.getMonth()) {
        return from.getDate() <= to.getDate();
        } else {
        return false;
        }
    } else {
        return false;
  }
}

//Function for parsing a JavaScript date into a string format.
function formatDate(date) {
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return `${month} ${day}, ${year}`;
    }

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
 *          id: <Integer>
 *          timeOffId: <Integer>
 *          from: <Date>
 *          to: <Date>
 *          hours: <Float>
 *          type: <String>
 *      }
 *
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffRequest({
  close,
  sendRequest,
  initialRequest,
  style,
}) {
    //Time off policy menu
    const [categoryMenu, setCategoryMenu] = useState([]);
    //Selected time off policy
    const [category, setCategory] = useState(null);
    //Time off starting and ending dates
    const [from, setFrom] = useState(
        initialRequest ? initialRequest.from : dayjs().toDate()
    );
    const [to, setTo] = useState(
        initialRequest ? initialRequest.to : dayjs().toDate()
    );
    //States determining whether the menus for setting dates should be open
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    //Range of dates between the starting and ending date
    const [dateRange, setDateRange] = useState(getDateRange());
    //Total number of hours, full days and half days off
    const [totalHoursOff, setTotalHoursOff] = useState(0);
    const [fullDaysOff, setFullDaysOff] = useState(0);
    const [halfDaysOff, setHalfDaysOff] = useState(0);
    //Flag determining if the amount of time off should be set for each day or for just the
    //starting and ending dates
    const [eachDay, setEachday] = useState(false);
    //Flag determining if there is enough time off balance for the given policy to grant the
    //requested time off amount
    const [validRequest, setValidRequest] = useState(true);
    //Flag determining if an error has occured
    const [errorOccurred, setErrorOccurred] = useState(false);

    //Retrieve policy category options
    useEffect(() => {
        getTimeOffPolicies();
    }, []);

    //Set initial time off policy option
    useEffect(() => {
        setCategory(
            (initialRequest) ? 
            categoryMenu.filter((item) => item.timeOffId === initialRequest.timeOffId)[0] : 
            categoryMenu[0]
        );
    }, [categoryMenu]);

    /*
    useEffect(() => {
        if (category) {
            setValidRequest(totalHoursOff <= category.availableHours); 
        }
    }, [category]);
    */

    //Automatically adjust dates to ensure a valid period is set
    useEffect(() => {
        if (!isValidPeriod(from, to)) {
            setTo(from);
        }
        setDateRange(getDateRange());
        calculateTimeOffHours();
    }, [from]);

    useEffect(() => {
        if (!isValidPeriod(from, to)) {
            setFrom(to);
        }
        setDateRange(getDateRange());
        calculateTimeOffHours();
    }, [to]);

    const MemoTimeOffTable = memo(TimeOffTable);

    const currentUser = 1;
    const timeOffPolicyPOSTURL = `http://localhost:5000/api/employeeannualtimeoffs/${currentUser}`;
    const timeOffPolicyPUTURL = `http://localhost:5000/api/employeeannualtimeoffs`;
    const timeOffPeriodURL = `http://localhost:5000/api/timeoffhistories`;

    //Function for retrieving the time off category options
    function getTimeOffPolicies() {
        //Retrieve employeeAnnualTimeOff records from database
        axios.post(timeOffPolicyPOSTURL)
        .then((response) => {
            const policies = {};
            //We are only interested in the records for the current year
            const data = response.data.filter((p) => p.year === dayjs().year());
            data.forEach((p) => {
                policies[p.category] = {
                    id: p.id,
                    timeOffId: p.timeOffId,
                    type: p.category,
                    availableHours: p.hoursLeft + ((initialRequest && initialRequest.timeOffId === p.timeOffId) ? initialRequest.hours : 0),
                    hoursUsed: p.hoursUsed
                }
            });
            //Set each policy as a selectable item in the dropdown
            setCategoryMenu(Object.values(policies));
        })
        .catch((error) => console.log(error));
    };

    //Date range for setting full and half days off
    function getDateRange() {
        const range = [];
        for (
            let d = new Date(from);
            isValidPeriod(d, to);
            d.setDate(d.getDate() + 1)
        ) {
            const data = {
                date: formatDate(new Date(d)),
                day: "full", // full by default
            };
            range.push(data);
        }
        return range;
    };

    //Calculate the total hours, full days and half days off based on the radio inputs selected
    function calculateTimeOffHours() {
        let totalHours = 0;
        let fullDays = 0;
        let halfDays = 0;
        //If setting the time off for each day individually
        if (eachDay) {
            //Iterate through each day, calculating the time off hours individually
            dateRange.forEach((d) => {
                if (d.day === "half") {
                    totalHours += 4;
                    halfDays++;
                } else {
                    totalHours += 8;
                    fullDays++;
                }
            });
        } 
        //If only setting time off for the first and last day
        else {
            if (dateRange.length === 0) {
                return;
            }
            let d = dateRange[0];
            //Calculate the time off hours for the first day
            if (d.day === "half") {
                totalHours += 4;
                halfDays++;
            } 
            else {
                totalHours += 8;
                fullDays++;
            }
            if (dateRange.length >= 2) {
                d = dateRange[dateRange.length - 1];
                //Calculate the time off hours for the last day
                if (d.day === "half") {
                    totalHours += 4;
                    halfDays++;
                } else {
                    totalHours += 8;
                    fullDays++;
                }
                //Assume all days in between are full days off
                totalHours += (dateRange.length - 2) * 8;
                fullDays += dateRange.length - 2;
            }
        }
        setTotalHoursOff(totalHours);
        setFullDaysOff(fullDays);
        setHalfDaysOff(halfDays);
        //If the amount of time off requested exceeds what the selected time off policy allows,
        //then the send or update button will be disabled
        if (category) { 
            setValidRequest(totalHours <= category.availableHours); 
        }
    };

    //Function for submitting a time off request
    function handleSubmit() {
        //console.log("running handleSubmit()");
        //Create and submit a new time off period to the database
        const newPeriod = {
            startDate: dayjs(from).toString(),
            endDate: dayjs(to).toString(),
            hours: totalHoursOff,
            empId: currentUser,
            timeOffId: category.timeOffId,
            requestDate: dayjs().toString(),
            decisionDate: dayjs().add(1, "day").toString()
        };
        console.log(newPeriod);
        axios.post(timeOffPeriodURL, newPeriod)
        .then((response) => {
            console.log(response);
            //Update the time off balance
            const newBalance = {
                id: category.id,
                cumulativeHoursTaken: category.hoursUsed + totalHoursOff
            }
            axios.put(timeOffPolicyPUTURL, newBalance)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
            sendRequest();
        })
        .catch((error) => {
            console.log(error);
            setErrorOccurred(true);
        });
    };

    //Function for modifying an existing time off request
    function handleEdit() {
        //Update the initial time off period
        const updatedPeriod = {
            id: initialRequest.id,
            startDate: dayjs(from).toString(),
            endDate: dayjs(to).toString(),
            hours: totalHoursOff,
            timeOffId: category.timeOffId
        };
        axios.put(timeOffPeriodURL, updatedPeriod)
        .then((response) => {
            console.log(response);
            //If the time off policy has changed
            if (initialRequest.timeOffId !== category.timeOffId) {
                //Refund the hours used in the original policy
                const refundBalance = {
                    //Need to get employeeAnnualTimeOff id
                    id: categoryMenu.filter((p) => p.timeOffId === initialRequest.timeOffId)[0].id,
                    cumulativeHoursTaken: categoryMenu.filter((p) => p.timeOffId === initialRequest.timeOffId)[0].hoursUsed - initialRequest.hours
                }
                axios.put(timeOffPolicyPUTURL, refundBalance)
                .then((response) => {
                    console.log(response);
                    //Subtract the hours used in the new policy
                    const newBalance = {
                        id: category.id,
                        cumulativeHoursTaken: category.hoursUsed + totalHoursOff
                    };
                    axios.put(timeOffPolicyPUTURL, newBalance)
                    .then((response) => {
                        console.log(response);
                        sendRequest();
                    })
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
            }
            //If the time off policy is the same but the amount of time off has changed
            else if (initialRequest.hours !== totalHoursOff) {
                //Update the new balance for the current policy
                const newBalance = {
                    id: category.id,
                    cumulativeHoursTaken: category.hoursUsed + totalHoursOff - initialRequest.hours
                };
                axios.put(timeOffPolicyPUTURL, newBalance)
                .then((response) => {
                    console.log(response);
                    sendRequest();
                })
                .catch((error) => console.log(error));
            }
            else {
                sendRequest();
            }
        })
        .catch((error) => {
            console.log(error);
            setErrorOccurred(true);
        });
    };

    return (
        <Box
        sx={{
            ...{
            borderRadius: "12px",
            boxShadow: "0 15px 6px #10182808",
            paddingX: "36px",
            paddingY: "30px",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily,
            },
            ...style,
        }}
        >
        {/*Title*/}
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
            marginBottom: "30px",
            }}
        >
            {initialRequest ? (
            <h3>Edit my time off</h3>
            ) : (
            <h3>Request new time off</h3>
            )}
            <CloseIcon
            onClick={close}
            sx={{
                backgroundColor: "#FFFFFFF",
                "&:hover": {
                cursor: "pointer",
                backgroundColor: "#D0D5DD",
                },
            }}
            />
        </Stack>
        {/*Set time off category*/}
        <h4>Time off category</h4>
        <Autocomplete
            disablePortal
            options={categoryMenu}
            getOptionLabel={(option) => `${option.type} - left: ${Math.floor(option.availableHours / 8)} days (${option.availableHours} hours)`}
            renderInput={(params) => (
            <TextField {...params} placeholder="Time off category" />
            )}
            value={category}
            onChange={(e, newCategory) => setCategory(newCategory)}
            sx={{
            width: "100%",
            marginBottom: "40px",
            }}
        />
        {/*Set starting and ending dates of time off period*/}
        <Stack
            direction="row"
            alignItems="center"
            spacing={4}
            sx={{ marginBottom: "40px" }}
        >
            <Box>
            <h4>From</h4>
            <Chip
                icon={<CalendarMonthIcon />}
                label={formatDate(from)}
                variant="outlined"
                onClick={() => setOpenFrom(true)}
                sx={{ borderRadius: "4px" }}
            />
            </Box>
            <Box>
            <h4>To</h4>
            <Chip
                icon={<CalendarMonthIcon />}
                label={formatDate(to)}
                variant="outlined"
                onClick={() => setOpenTo(true)}
                sx={{ borderRadius: "4px" }}
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
            style={{ marginRight: "10px" }}
            />
            <p>Set hours for each day during the time off period</p>
        </Stack>
        {/*Time off per day table*/}
        <MemoTimeOffTable
            dateRange={dateRange}
            eachDay={eachDay}
            onChange={calculateTimeOffHours}
        />
        {/*Time off summary*/}
        <p style={{ marginBottom: "30px" }}>
            {fullDaysOff} full days ({fullDaysOff * 8} hrs) and {halfDaysOff} half
            day ({halfDaysOff * 4} hrs) will be requested ({totalHoursOff} hrs in
            total).
        </p>
        {!validRequest && <h4 style={{color: "#D92D20", marginBottom: "15px"}}>
            You are requesting {totalHoursOff} hours off. The selected time off policy only 
            has {category.availableHours} hours available.
        </h4>}
        {/*Error message to be displayed if an error occurs*/}
        {errorOccurred && <h3 style={{color: "#D92D20", marginBottom: "15px"}}>
            An error occurred. Could not send time off request.
        </h3>}
        {/*Send or cancel*/}
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={3}
        >
            <HRMButton mode="secondaryB" onClick={close}>
            Cancel
            </HRMButton>
            {initialRequest ? (
            <HRMButton mode="primary" onClick={handleEdit} enabled={validRequest}>
                Update
            </HRMButton>
            ) : (
            <HRMButton mode="primary" onClick={handleSubmit} enabled={validRequest}>
                Send
            </HRMButton>
            )}
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
}

//Control panel settings for storybook
TimeOffRequest.propTypes = {
    //The function to close this component
    close: PropTypes.func,

    //The function to send the request and close this component
    sendRequest: PropTypes.func,
};

//Default values for this component
TimeOffRequest.defaultProps = {
    initialRequest: null,
    style: {},
};
