import Box from "@mui/system/Box";
import dayjs from "dayjs";
import { styled } from "@mui/system";
import { fonts } from "../../Styles";

//Function for parsing a JavaScript date into a string format.
function formatDate(date) {
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return `${month} ${day}, ${year}`;
};

/**
 * Content component for displaying the information of a given survey.
 * 
 * Props:
 * - surveyInfo<Array<Object>>: Information on the selected survey to be displayed
 *      Syntax: {
 *          field: <String>
 *          answer: <String>
 *      }
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function SurveyInfo({surveyInfo, style}) {
    //Custom style elements
    const StyledTD = styled("td")({
        verticalAlign: "top",
        textAlign: "start",
        width: "50%",
        paddingTop: "10px",
        paddingBottom: "20px",
        borderTop: "1px solid #EBEBEB"
    });

    return (
        <Box sx={{...{
            width: "692px",
            fontFamily: fonts.fontFamily,
            fontSize: fonts.default.size
        }, ...style}}>
            <table style={{ width: "100%" }}>
                <tr>
                    <StyledTD><b>{surveyInfo.welcomeTitle}</b></StyledTD>
                    <StyledTD>{surveyInfo.welcomeMessage}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>{surveyInfo.endTitle}</b></StyledTD>
                    <StyledTD>{surveyInfo.endMessage}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Start date:</b></StyledTD>
                    <StyledTD>{formatDate(dayjs(surveyInfo.startedAt).toDate())}</StyledTD>
                </tr>
                <tr>
                    <StyledTD><b>Finish date:</b></StyledTD>
                    <StyledTD>{formatDate(dayjs(surveyInfo.completedAt).toDate())}</StyledTD>
                </tr>
            </table>
        </Box>
    );
};

//Control panel settings for storybook
SurveyInfo.propTypes = {};

//Default values for this component
SurveyInfo.defaultProps = {
    style: {}
};