import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import Label from '../Label/Label';
import HRMButton from '../Button/HRMButton';
import NewTeamMember from '../PopupComponents/NewTeamMember';
import TimeOffRequestSentWindow from '../PopupComponents/TimeOffRequestSentWindow';
import TimeOffApproval from '../PopupComponents/TimeOffApproval';
import AvatarImage from '../../Images/a99b7c47182d3a04f5f3ed31db0dd8a6.jpg';
import { useState } from 'react';
import PropTypes from 'prop-types';
const axios = require('axios').default;

/**
 * Menu component for listing update notifications in the home page.
 * 
 * Props:
 * - updates<Array<Object>>: List of objects containing update information to be displayed.
 *      Syntax of updates: {
 *          id: <Integer>
 *          empId: <Integer>
 *          status: <String ['new', 'waiting', 'seen']>
 *          name: <String>
 *          description: <String>
 *      }
 * 
 * - refresh<Function>: Function for refreshing the list of updates. Mainly used after marking
 *      an update as read or unread
 *      Syntax: refresh()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function UpdatesList({updates, refresh, style}) {
    const [newMember, setNewMember] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [approval, setApproval] = useState(false);

    const newMemberDetails = {
        avatar: AvatarImage,
        name: 'Gabriel Chan',
        role: 'Full Stack Developer',
        email: 'gabriel.chan@bluewavelabs.ca',
        office: 'Toronto',
        effectiveDate: '1 January 2024'
    };

    const requestSentDetails = {
        timeOffBalance: '18 days',
        timeOffRequested: '1 Oct - 4 Oct',
        requestedDaysTotal: '2 days',
        timeOffCategory: 'Vacation',
        notes: 'I will be on vacation for 2 days. Thank you'
    };

    const approvalDetails = {
        avatar: AvatarImage,
        name: 'Gabriel Chan',
        role: 'Front End Developer',
        email: 'gabriel.chan@bluewavelabs.ca',
        office: 'Toronto',
        effectiveDate: '1 January 2024',
        timeOffBalance: '18 days',
        timeOffRequested: '1 Oct - 4 Oct',
        requestedDaysTotal: '2 days',
        timeOffCategory: 'Vacation'
    };

    function handleSwitch(up) {
        const url = `${process.env.URL}/updates/${up.id}`;
        console.log("Running handleSwitch()");
        axios.put(
            url, 
            { status: (up.status === "new" || up.status === "waiting") ? "seen" : "new" }, 
            { params: { id: up.id } })
        .then((response) => {
            console.log(response);
            refresh();
        })
        .catch((error) => {
            console.log(error);
        })
    };

    /*
    function ShowNotification(type, details) {
        if (type === "New team member added") {
            return (
                <NewTeamMember employee_details={details} close={() => setNewMember(false)} />
            );
        }
        else if (type === "New time off request") {
            return (
                <TimeOffApproval request_information={details} close={() => setApproval(false)} />
            );
        }
        else if (type === "Your time off request has been sent") {
            return (
                <TimeOffRequestSentWindow request_information={details} close={() => setRequestSent(false)} />
            );
        }
    };
    */

    return (
        <>
            <TableContainer sx={{...{
                minWidth: "925px"
            }, ...style}}>
                <Table>
                    <TableBody>
                        {updates.map((update) => (
                            <TableRow sx={{
                                backgroundColor: (update.status != "seen") ? "#F9FAFB" : "#FFFFFF",
                                border: "1px solid #EAECF0",
                            }}>
                                {/*Update status*/}
                                <TableCell>
                                    {update.status === "new" && <Label mode="status" dot="orange" label="New"/>}
                                    {update.status === "waiting" && <Label mode="status" dot="red" label="Waiting"/>}
                                    {update.status === "seen" && <Label mode="status" dot="grey" label="Seen"/>}
                                </TableCell>
                                {/*Update name and description*/}
                                <TableCell><b>{update.name}</b></TableCell>
                                <TableCell>{update.description}</TableCell>
                                {/*Mark as read/unread button*/}
                                <TableCell align="right" sx={{paddingRight: 0, width: "16%"}}>
                                    <HRMButton mode="tertiary" onClick={() => handleSwitch(update)}>
                                        <b>Mark as {update.status === "seen" && 'un'}read</b>
                                    </HRMButton>
                                </TableCell>
                                {/*View button*/}
                                <TableCell align="right" sx={{paddingLeft: 0}}>
                                    <HRMButton 
                                        mode="tertiary" 
                                        onClick={() => {
                                            if (update.name === "New team member added") {
                                                setNewMember(true)
                                            }
                                            if (update.name === "New time off request") {
                                                setApproval(true)
                                            }
                                            if (update.name === "Your time off request has been sent") {
                                                setRequestSent(true)
                                            }
                                        }} 
                                    >
                                        <a 
                                            style={{
                                                color: "#7F56D9", 
                                                textDecoration: "none", 
                                                fontWeight: "bold"
                                            }}
                                        >
                                            View
                                        </a>
                                    </HRMButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={newMember} onClose={() => setNewMember(false)}>
                <NewTeamMember employee_details={newMemberDetails} close={() => setNewMember(false)} />
            </Dialog>
            <Dialog open={requestSent} onClose={() => setRequestSent(false)}>
                <TimeOffRequestSentWindow request_information={requestSentDetails} close={() => setRequestSent(false)} />
            </Dialog>
            <Dialog open={approval} onClose={() => setApproval(false)}>
                <TimeOffApproval request_information={approvalDetails} close={() => setApproval(false)} />
            </Dialog>
        </>
    );
};

//Control panel settings for storybook
UpdatesList.propTypes = {
    //List of updates to be rendered
    updates: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
};

//Default values for this component
UpdatesList.defaultProps = {
    style: {}
};