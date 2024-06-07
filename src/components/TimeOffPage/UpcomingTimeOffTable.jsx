import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Stack from '@mui/system/Stack';
import { styled } from '@mui/system';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';

/**
 * Menu component for listing upcoming scheduled periods of time off
 * 
 * Props:
 * - timeOffs<Array<Object>>: List of objects containing information of upcoming periods of time 
 *      off.
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function UpcomingTimeOffTable({timeOffs, style}) {
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
                        <TableHeaderCell sx={{paddingLeft: "25px"}}><b>From</b></TableHeaderCell>
                        <TableHeaderCell><b>To</b></TableHeaderCell>
                        <TableHeaderCell><b>Type</b></TableHeaderCell>
                        <TableHeaderCell><b>Amount</b></TableHeaderCell>
                        <TableHeaderCell colSpan={2}><b>Note</b></TableHeaderCell>
                    </TableRow>
                </TableHead>
                {/*Time off information*/}
                <TableBody>
                    {timeOffs.map((timeOff) => (
                        <TableRow>
                            {/*Starting and ending dates of time off period*/}
                            <TableBodyCell sx={{paddingLeft: "25px"}}>
                                <StyledChip label={<b>{timeOff.from}</b>} />
                            </TableBodyCell>
                            <TableBodyCell>
                                <StyledChip label={<b>{timeOff.to}</b>} />
                            </TableBodyCell>
                            {/*Time off category*/}
                            <TableBodyCell>{timeOff.type}</TableBodyCell>
                            {/*Time off amount*/}
                            <TableBodyCell>{timeOff.amount}</TableBodyCell>
                            {/*Time off additional notes*/}
                            <TableBodyCell>{timeOff.note}</TableBodyCell>
                            {/*Buttons to edit and delete time off period*/}
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

//Control Panel settings for storybook
UpcomingTimeOffTable.propTypes = {};

//Default values for this component
UpcomingTimeOffTable.defaultProps = {
    style: {}
};