import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/system/Stack";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import HRMButton from "../Button/HRMButton";
import { colors } from "../../Styles";

/**
 * Menu component for listing surveys and their results in the surveys page.
 * 
 * Props: 
 * - surveyList<Array<Object>>: List of surveys to be displayed
 *      Syntax of survey: {
 *          name: <String>
 *          startDate: <String>
 *          finishDate: <String>
 *          answered: <String>
 *          information: <Array<Object>>
 *          responses: <Array<Object>>
 *      }
 * 
 * - setSurvey<Function>: Function provided by the parent component for setting the selected survey.
 *      Syntax: setSurvey(<Object>)
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function SurveysTable({surveyList, setSurvey, style}) {
    //Custom style elements
    const TableHeaderCell = styled(TableCell)({
        color: colors.darkGrey,
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "12px",
        paddingBottom: "12px"
    });

    const TableBodyCell = styled(TableCell)({
        color: colors.darkGrey,
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "16px",
        paddingBottom: "16px"
    });

    return (
        <TableContainer sx={{...{
            minWidth: "792px"
        }, ...style}}>
            <Table>
                {/*Table header*/}
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                        <TableHeaderCell><b>Name</b></TableHeaderCell>
                        <TableHeaderCell><b>Start date</b></TableHeaderCell>
                        <TableHeaderCell><b>Finish date</b></TableHeaderCell>
                        <TableHeaderCell colSpan={2}><b>Answered</b></TableHeaderCell>
                    </TableRow>
                </TableHead>
                {/*Surveys*/}
                <TableBody>
                    {surveyList.map((survey) => (
                        <TableRow>
                            <TableBodyCell><b>{survey.name}</b></TableBodyCell>
                            <TableBodyCell>{survey.startDate}</TableBodyCell>
                            <TableBodyCell>{survey.finishDate}</TableBodyCell>
                            <TableBodyCell>{survey.answered}</TableBodyCell>
                            <TableBodyCell>
                                <Stack 
                                    direction="row" 
                                    alignItems="center" 
                                    justifyContent="flex-end" 
                                    spacing={1}
                                >
                                    <HRMButton mode="tertiary">
                                        <b>Delete</b>
                                    </HRMButton>
                                    <HRMButton mode="tertiary" onClick={() => setSurvey(survey)}>
                                        <b style={{ color: colors.purple }}>View</b>
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

//Control panel settings for storybook
SurveysTable.propTypes = {
    //List of surveys to be displayed
    surveyList: PropTypes.array,

    //Function provided by the parent component for setting the selected survey
    setSurvey: PropTypes.func
};

//Default values for this component
SurveysTable.defaultProps = {
    style: {}
};