import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Stack from '@mui/system/Stack';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import HRMButton from '../Button/HRMButton';
import Label from '../Label/Label';
import { colors, fonts } from '../../Styles';

/**
 * Menu component for listing upcoming scheduled periods of time off
 * 
 * Props:
 * - timeOffPeriods<Array<Object>>: List of objects containing information of upcoming periods 
 *      of time off.
 * 
 * - editFlag<Boolean>: Boolean determining if time off periods can be edited or deleted.
 *      Default: false
 * 
 * - teamFlag<Boolean>: Boolean determining if the time off periods belong to other team members.
 *      Default: false
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function UpcomingTimeOffTable({timeOffPeriods, editFlag, teamFlag, style}) {
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
        <TableContainer sx={{...{
            minWidth: "885px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <Table>
                {/*Table header*/}
                <TableHead>
                    <TableRow sx={{backgroundColor: "#F9FAFB"}}>
                        {teamFlag && <TableHeaderCell sx={{paddingLeft: "25px"}}><b>Person</b></TableHeaderCell>}
                        {teamFlag && <TableHeaderCell><b>From</b></TableHeaderCell>}
                        {!teamFlag && <TableHeaderCell sx={{paddingLeft: "25px"}}><b>From</b></TableHeaderCell>}
                        <TableHeaderCell><b>To</b></TableHeaderCell>
                        <TableHeaderCell><b>Type</b></TableHeaderCell>
                        <TableHeaderCell><b>Amount</b></TableHeaderCell>
                        <TableHeaderCell colSpan={(teamFlag) ? 1 : 2}><b>Note</b></TableHeaderCell>
                        {teamFlag && <TableHeaderCell><b>Status</b></TableHeaderCell>}
                    </TableRow>
                </TableHead>
                {/*Time off information*/}
                <TableBody>
                    {timeOffPeriods.map((period) => (
                        <TableRow>
                            {teamFlag && 
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
                            <TableBodyCell>{period.type}</TableBodyCell>
                            {/*Time off amount*/}
                            <TableBodyCell>{period.amount}</TableBodyCell>
                            {/*Time off additional notes*/}
                            <TableBodyCell>{period.note}</TableBodyCell>
                            {/*Buttons to edit and delete time off period*/}
                            {editFlag && 
                                <TableBodyCell>
                                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                                        <HRMButton mode="tertiary"><b>Delete</b></HRMButton>
                                        <HRMButton mode="tertiary">
                                            <a 
                                                href="#" 
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
                            {/*The status of the time off period*/}
                            {teamFlag && 
                                <TableBodyCell>
                                    <Label
                                        mode="status" 
                                        dot={
                                            (period.status === "Approved") ? "green" :
                                            (period.status === "Waiting") ? "orange" :
                                            (period.status === "Rejected") ? "red" : null
                                        }
                                        label={period.status}
                                    />
                                </TableBodyCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

//Control panel settings for storybook
UpcomingTimeOffTable.propTypes = {
    //Periods of time off to be displayed
    timeOffPeriods: PropTypes.arrayOf(PropTypes.object),

    //Boolean determining if time off periods can be edited or deleted in this menu
    editFlag: PropTypes.bool,

    //Boolean determining if the time off periods of other users are being displayed in this menu
    teamFlag: PropTypes.bool
};

//Default values for this component
UpcomingTimeOffTable.defaultProps = {
    editFlag: false,
    teamFlag: false,
    style: {}
};