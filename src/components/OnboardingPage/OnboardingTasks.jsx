import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
import { useState } from "react";
import HRMButton from "../Button/HRMButton";
import ToDoTable from "./ToDoTable";
import { fonts } from "../../Styles";

/**
 * Menu component for the onboarding page containing onboarding tasks to be completed.
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
 * - tasks<Array<Object>>: List of tasks represented by objects containing the task name, status and index.
 *      Syntax of task: {
 *          name: <String>,
 *          done: <Boolean>,
 *          index: <Integer>
 *      }
 * 
 * - setTasks<Function>: Function provided by the parent component to modify the status of each task.
 *      Syntax: setTasks(<Object>)
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function OnboardingTasks({prev, next, save, tasks, setTasks, style}) {
    //Flag determining if the user has completed all the tasks
    const [allTasksComplete, setAllTasksComplete] = useState(tasks.every((task) => task.done));

    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: "10px",
            minWidth: "1003px",
            paddingX: "113px",
            paddingY: "44px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Title*/}
            <h4 style={{textAlign: "center", marginTop: 0, marginBottom: "10px"}}>Complete your to-do items</h4>
            <p style={{textAlign: "center", marginBottom: "50px"}}>
                You may discuss your to-dos with your manager
            </p>
            {/*Content*/}
            <ToDoTable
                tasks={tasks} 
                setTasks={setTasks}
                setAllTasksComplete={setAllTasksComplete} 
                style={{marginBottom: "50px"}}
            />
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
                    <HRMButton mode="primary" enabled={allTasksComplete} onClick={next}>Save and next</HRMButton>
                </Stack>
            </Stack>
        </Box>
    );
};

//Control panel settings for storybook
OnboardingTasks.propTypes = {
    //Function for transitioning to the previous page
    prev: PropTypes.func,

    //Function for transitioning to the next page
    next: PropTypes.func,

    //Function for saving the onboarding status
    save: PropTypes.func,

    //List of tasks
    tasks: PropTypes.arrayOf(PropTypes.object),

    //Function for setting the status of tasks
    setTasks: PropTypes.func
};

//Default values for this component
OnboardingTasks.defaultProps = {
    style: {}
};