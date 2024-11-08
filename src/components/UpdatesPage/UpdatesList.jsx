import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Label from '../Label/Label';
import HRMButton from '../Button/HRMButton';
import PropTypes from 'prop-types';

/**
 * Menu component for listing update notifications in the home page.
 * 
 * Props:
 * - updates<Array<Object>>: List of objects containing update information to be displayed.
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function UpdatesList({updates, style}) {
    return (
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
                                {update.status == "new" && <Label mode="status" dot="orange" label="New"/>}
                                {update.status == "waiting" && <Label mode="status" dot="red" label="Waiting"/>}
                                {update.status == "seen" && <Label mode="status" dot="grey" label="Seen"/>}
                            </TableCell>
                            {/*Update name and description*/}
                            <TableCell><b>{update.name}</b></TableCell>
                            <TableCell>{update.desc}</TableCell>
                            {/*Mark as read/unread button*/}
                            <TableCell align="right" sx={{paddingRight: 0, width: "16%"}}>
                                <HRMButton mode="tertiary">
                                    <b>Mark as {update.status != "seen" && 'un'}read</b>
                                </HRMButton>
                            </TableCell>
                            {/*View button*/}
                            <TableCell align="right" sx={{paddingLeft: 0}}>
                                <HRMButton mode="tertiary">
                                    <a 
                                        href="#" 
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