import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Stack from '@mui/system/Stack';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import { useState } from 'react';
import HRMButton from '../Button/HRMButton';
import Label from '../Label/Label';
import TimeOffRequest from '../PopupComponents/TimeOffRequest';
import DeleteTimeOff from '../PopupComponents/DeleteTimeOff';
import { colors, fonts } from '../../Styles';

/**
 * Menu component for listing upcoming scheduled periods of time off
 * 
 * Props:
 * - timeOffPeriods<Array<Object>>: List of objects containing information of upcoming periods 
 *      of time off.
 * 
 * - tableColumns<Array<String>>: List of table columns to be displayed
 * 
 * - editFlag<Boolean>: Boolean determining if time off periods can be edited or deleted.
 *      Default: false
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function UpcomingTimeOffTable({
    timeOffPeriods, 
    tableColumns, 
    editFlag, 
    refresh, 
    style
}) {
    //States determining whether the edit time off request menu and delete time off request
    //component should be displayed
    const [editTimeOff, setEditTimeOff] = useState(false);
    const [deleteTimeOff, setDeleteTimeOff] = useState(false);
    const [timeOffId, setTimeOffId] = useState(null);

    const timeOffRequest = {
        startDate: new Date(2024, 1, 1),
        endDate: new Date(2024, 2, 1),
        type: 'Vacation'
    };

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

    return (
        <>
            <TableContainer sx={{...{
                minWidth: "885px",
                fontFamily: fonts.fontFamily
            }, ...style}}>
                <Table>
                    {/*Table header*/}
                    <TableHead>
                        <TableRow sx={{backgroundColor: "#F9FAFB"}}>
                            {tableColumns.includes("Person") && <TableHeaderCell sx={{paddingLeft: "25px"}}><b>Person</b></TableHeaderCell>}
                            {tableColumns.includes("Person") ? 
                                <TableHeaderCell><b>From</b></TableHeaderCell> :
                                <TableHeaderCell sx={{paddingLeft: "25px"}}><b>From</b></TableHeaderCell>
                            }
                            <TableHeaderCell><b>To</b></TableHeaderCell>
                            {tableColumns.includes("Type") && 
                                <TableHeaderCell><b>Type</b></TableHeaderCell>
                            }
                            {tableColumns.includes("Amount") && 
                                <TableHeaderCell><b>Amount</b></TableHeaderCell>
                            }
                            {tableColumns.includes("Note") && 
                                <TableHeaderCell colSpan={(tableColumns.includes("Status")) ? 1 : 2}>
                                    <b>Note</b>
                                </TableHeaderCell>
                            }
                            {tableColumns.includes("Status") && <TableHeaderCell><b>Status</b></TableHeaderCell>}
                            
                        </TableRow>
                    </TableHead>
                    {/*Time off information*/}
                    <TableBody>
                        {timeOffPeriods.map((period) => (
                            <TableRow>
                                {tableColumns.includes('Person') &&
                                    <TableBodyCell>
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Avatar alt={period.user.name} src={period.user.avatar} />
                                            <p>{period.user.name}</p>
                                        </Stack>
                                    </TableBodyCell>
                                }
                                {/*Starting and ending dates of time off period*/}
                                <TableBodyCell sx={{paddingLeft: "25px"}}>
                                    <StyledChip label={<b>{period.from}</b>} />
                                </TableBodyCell>
                                <TableBodyCell>
                                    <StyledChip label={<b>{period.to}</b>} />
                                </TableBodyCell>
                                {/*Time off category*/}
                                {tableColumns.includes('Type') && <TableBodyCell>{period.type}</TableBodyCell>}
                                {/*Time off amount*/}
                                {tableColumns.includes('Amount') && <TableBodyCell>{period.amount}</TableBodyCell>}
                                {/*Time off additional notes*/}
                                {tableColumns.includes('Note') && <TableBodyCell>{period.note}</TableBodyCell>}
                                {/*The status of the time off period*/}
                                {tableColumns.includes('Status') &&
                                    <TableBodyCell>
                                        <Label
                                            mode="status" 
                                            dot={
                                                (period.status === "Approved") ? "green" :
                                                (period.status === "Pending") ? "orange" :
                                                (period.status === "Declined") ? "red" : null
                                            }
                                            label={period.status}
                                        />
                                    </TableBodyCell>
                                }
                                {/*Buttons to edit and delete time off period*/}
                                {editFlag && 
                                    <TableBodyCell>
                                        <Stack direction="row" alignItems="center" justifyContent="flex-end">
                                            <HRMButton 
                                                mode="tertiary" 
                                                onClick={() => {
                                                    setTimeOffId(period.id);
                                                    setDeleteTimeOff(true);
                                                }}
                                            >
                                                <b>Delete</b>
                                            </HRMButton>
                                            <HRMButton 
                                                mode="tertiary"
                                                onClick={() => setEditTimeOff(true)}
                                            >
                                                <a 
                                                    style={{
                                                        color: "#7F56D9", 
                                                        textDecoration: "none", 
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    Edit
                                                </a>
                                            </HRMButton>
                                        </Stack>
                                    </TableBodyCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*Edit time off request menu*/}
            <Dialog open={editTimeOff} onClose={() => setEditTimeOff(false)}>
                <TimeOffRequest 
                    close={() => setEditTimeOff(false)} 
                    sendRequest={() => setEditTimeOff(false)} 
                    initialRequest={timeOffRequest} 
                />
            </Dialog>
            {/*Delete time off request notification*/}
            <Dialog open={deleteTimeOff} onClose={() => setDeleteTimeOff(false)}>
                <DeleteTimeOff 
                    timeOffId={timeOffId}
                    close={() => setDeleteTimeOff(false)} 
                    refresh={() => {
                        refresh();
                        setDeleteTimeOff(false);
                    }}
                />
            </Dialog>
        </>
    );
};

//Control panel settings for storybook
UpcomingTimeOffTable.propTypes = {
    //Periods of time off to be displayed
    timeOffPeriods: PropTypes.arrayOf(PropTypes.object),

    //Table columns to be displayed
    tableColumns: PropTypes.arrayOf(PropTypes.string),

    //Boolean determining if time off periods can be edited or deleted in this menu
    editFlag: PropTypes.bool
};

//Default values for this component
UpcomingTimeOffTable.defaultProps = {
    editFlag: false,
    style: {}
};