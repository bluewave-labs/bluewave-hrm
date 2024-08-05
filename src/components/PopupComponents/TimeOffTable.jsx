import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/system';
import Checkbox from '../Checkbox/Checkbox';
import { colors } from '../../Styles';
import { useState } from 'react';
import PropTypes from 'prop-types';

function initialInput(dateRange) {
    console.log("Running initialInput()");
    const radioInput = {};
    for (const date of dateRange) {
        radioInput[date] = "full";
    }
    console.log(radioInput);
    return radioInput;
};

/**
 * Table component for displaying time off options for each day in the TimeOffRequest component.
 * 
 * Props:
 * - dateRange<Array<String>>: Array of dates in the range of the time off period.
 * 
 * - eachDay<Boolean>: Flag determining if every day in the date range should be displayed in the
 *      table.
 * 
 * - onChange<Function>: Function to handle changes made by the user to the radio buttons.
 */
export default function TimeOffTable({
    dateRange, 
    eachDay,
    onChange,
    style
}) {
    const [radioInput, setRadioInput] = useState(() => initialInput(dateRange));

    function handleChange(e) {
        console.log("Running handleChange()")
        setRadioInput({
            ...radioInput,
            [e.target.name]: e.target.value
        });
        console.log(radioInput);
        onChange();
    }

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
            width: "100%", 
            maxHeight: "260px", 
            marginY: "20px", 
            overflowY: "auto"
        }, ...style}}>
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
                                <StyledChip label={<b>{date}</b>} />
                            </TableBodyCell>
                            <TableBodyCell align="center">
                                <Checkbox 
                                    type="radio" 
                                    id={`${date}-full`}
                                    name={date}
                                    value="full" 
                                    onChange={handleChange}
                                    checked={radioInput[date] === "full"}
                                />
                            </TableBodyCell>
                            <TableBodyCell align="center">
                                <Checkbox 
                                    type="radio" 
                                    id={`${date}-half`} 
                                    name={date}
                                    value="half" 
                                    onChange={handleChange}
                                    checked={radioInput[date] === "half"}
                                />
                            </TableBodyCell>
                        </TableRow>
                    )) : (
                        <>
                            {dateRange.length > 0 &&
                                <TableRow>
                                    <TableBodyCell>
                                        <StyledChip label={<b>{dateRange[0]}</b>} />
                                    </TableBodyCell>
                                    <TableBodyCell align="center">
                                        <Checkbox 
                                            type="radio" 
                                            id={`${dateRange[0]}-full`}
                                            name={dateRange[0]}
                                            value="full" 
                                            onChange={handleChange}
                                            checked={radioInput[dateRange[0]] === "full"}
                                        />
                                    </TableBodyCell>
                                    <TableBodyCell align="center">
                                        <Checkbox 
                                            type="radio"
                                            id={`${dateRange[0]}-half`}
                                            name={dateRange[0]}
                                            value="half"
                                            onChange={handleChange}
                                            checked={radioInput[dateRange[0]] === "half"}
                                        />
                                    </TableBodyCell>
                                </TableRow>
                            }
                            {dateRange.length > 1 &&
                                <TableRow>
                                    <TableBodyCell>
                                        <StyledChip label={<b>{dateRange[dateRange.length - 1]}</b>} />
                                    </TableBodyCell>
                                    <TableBodyCell align="center">
                                        <Checkbox 
                                            type="radio" 
                                            id={`${dateRange[dateRange.length - 1]}-full`}
                                            name={dateRange[dateRange.length - 1]}
                                            value="full" 
                                            onChange={handleChange}
                                            checked={radioInput[dateRange[dateRange.length - 1]] === "full"}
                                        />
                                    </TableBodyCell>
                                    <TableBodyCell align="center">
                                        <Checkbox 
                                            type="radio"
                                            id={`${dateRange[dateRange.length - 1]}-half`}
                                            name={dateRange[dateRange.length - 1]}
                                            value="half"
                                            onChange={handleChange}
                                            checked={radioInput[dateRange[dateRange.length - 1]] === "half"}
                                        />
                                    </TableBodyCell>
                                </TableRow>
                            }
                        </>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

//Control panel settings for storybook
TimeOffTable.propTypes = {
    //Array of dates in the range of the time off period.
    dateRange: PropTypes.arrayOf(PropTypes.string),

    //Flag determining if every day in the date range should be displayed in the table.
    eachDay: PropTypes.bool,

    //Function to handle changes made by the user to the radio buttons.
    onChange: PropTypes.func
};

//Default values for this component
TimeOffTable.defaultProps = {
    style: {}
};