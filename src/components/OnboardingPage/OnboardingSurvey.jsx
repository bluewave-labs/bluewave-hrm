import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import HRMButton from "../Button/HRMButton";
import { fonts } from "../../Styles";

/**
 * Menu component for the onboarding page containing survey questions for the new employee.
 * 
 * Props:
 * - prev<Function>: Function provided by the parent component to transition to the previous page.
 *      Syntax: previous()
 * 
 * - next<Function>: Function provided by the parent component to transition to the next page.
 *      Syntax: next()
 * 
 * - save<Function>: Function provided by the parent component to save the onboarding status and navigate to the
 *      application's homepage.
 *      Syntax: save()
 * 
 * - survey<Object<String, String>>: List of survey questions and their respective answers, represented by key-value 
 *      pairs in an object.
 * 
 * - setSurvey<Function>: Function provided by the parent component to modify the answer of each question.
 *      Syntax: setSurvey(<Object>)
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function OnboardingSurvey({prev, next, save, survey, setSurvey, style}) {
    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: "10px",
            minWidth: "1003px",
            paddingX: "113px",
            paddingY: "63px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Title*/}
            <h4 style={{textAlign: "center", marginTop: 0, marginBottom: "10px"}}>
                Please answer the questions below as detailed as possible
            </h4>
            <p style={{textAlign: "center", marginBottom: "50px"}}>
                Your answers are going to be used to further improve our process.
            </p>
            {/*Content*/}
            {Object.keys(survey).map((question) => (
                <>
                    <p style={{textAlign: "left", marginBottom: "8px"}}>{question}</p>
                    <TextField 
                        id={`${question}-textfield`}
                        value={survey[question]}
                        placeholder={"Your answer here"}
                        onChange={(e) => setSurvey({...survey, [question]: e.target.value})}
                        rows={4}
                        multiline
                        sx={{
                            marginBottom: "50px",
                            width: "100%"
                        }}
                    />
                </>
            ))}
            {/*Buttons*/}
            <Stack direction="row" alignContent="center" justifyContent="space-between">
                <HRMButton mode="secondaryB" startIcon={<ArrowBackIcon />} onClick={prev}>Previous</HRMButton>
                <Stack direction="row" alignContent="center" spacing={2}>
                    <HRMButton 
                        mode="secondaryB" 
                        onClick={save}
                    >
                        Save and complete later
                    </HRMButton>
                    <HRMButton mode="primary" onClick={next}>Save and next</HRMButton>
                </Stack>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
OnboardingSurvey.propTypes = {
    //Function for transitioning to the previous page
    prev: PropTypes.func,

    //Function for transitioning to the next page
    next: PropTypes.func,

    //Function for saving the onboarding status
    save: PropTypes.func,

    //List of survey questions and their answers
    survey: PropTypes.objectOf(PropTypes.string),

    //Function for modifying the answers of questions
    setSurvey: PropTypes.func
};

//Default values for this component
OnboardingSurvey.defaultProps = {
    style: {}
};