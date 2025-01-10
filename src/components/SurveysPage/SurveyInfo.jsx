import Box from "@mui/system/Box";
import { styled } from "@mui/system";
import { fonts } from "../../Styles";

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
                {surveyInfo.map((row) => (
                    <tr>
                        <StyledTD><b>{row.field}</b></StyledTD>
                        <StyledTD>{row.answer}</StyledTD>
                    </tr>
                ))}
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