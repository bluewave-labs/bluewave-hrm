import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
//import Select from "@mui/material/Select";
//import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Dialog from "@mui/material/Dialog";
import Autocomplete from "@mui/material/Autocomplete";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import DateSelect from "../PopupComponents/DateSelect";
import HRMButton from "../Button/HRMButton";
//import Checkbox from "../Checkbox/Checkbox";
import QuestionsList from "./QuestionsList";
import RecipientsList from "./RecipientsList";
import { fonts, colors } from "../../Styles";

//Function for determining if a time period is valid. A time period is only valid if the
//starting date is before or on the same day as the ending date.
function isValidPeriod(from, to) {
    if (from.getFullYear() < to.getFullYear()) {
        return true;
    } 
    else if (from.getFullYear() === to.getFullYear()) {
        if (from.getMonth() < to.getMonth()) {
            return true;
        } 
        else if (from.getMonth() === to.getMonth()) {
            return from.getDate() <= to.getDate();
        } 
        else {
            return false;
        }
    } else {
        return false;
  }
};

//Function for parsing a JavaScript date into a string format.
function formatDate(date) {
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return `${month} ${day}, ${year}`;
};

/**
 * Popup component for displaying the menu for creating a new survey. The user decides the name,
 * messages and questions before finally reviewing and creating the survey.
 * 
 * Props:
 * - close<Function>: Function for closing this popup component.
 *      Syntax: close()
 * 
 * - style<Object>: Optional prop for adding further inline styling
 *      Default: {}
 */
export default function NewSurveyPopup({close, style}) {
    //Page number outlining the stage of the new survey creation
    const [pageNumber, setPageNumber] = useState(1);
    //Falg determining if a previous survey should be used
    //const [usePrevious, setUsePrevious] = useState(false);
    //Flag determining if the popup for choosing the survey start date is open
    const [openStartDate, setOpenStartDate] = useState(false);
    //Flag determining if the popup for choosing the survey end date is open
    const [openEndDate, setOpenEndDate] = useState(false);
    //The text to be added when adding a new question
    const [newQuestionText, setNewQuestionText] = useState("");
    //The option selected when adding a new recipient for the survey
    const [newRecipient, setNewRecipient] = useState(null);
    //All the relevant information regarding the new survey to be created
    const [newSurvey, setNewSurvey] = useState({
        surveyName: "",
        welcomeScreenTitle: "",
        welcomeScreenMessage: "",
        endScreenTitle: "",
        endScreenMessage: "",
        startDate: dayjs().toDate(),
        endDate: dayjs().toDate(),
        questions: [],
        recipients: []
    });
    //Validation states for determining if error messages should be displayed
    const [validation, setValidation] = useState({
        1: false,
        2: false,
        3: false,
        4: false
    });

    const recipientOptions = [
        {
            category: "Team",
            name: "Everyone"
        },
        {
            category: "Team",
            name: "Marketing"
        },
        {
            category: "Team",
            name: "Research & Development"
        },
        {
            category: "Team",
            name: "Finance"
        },
        {
            category: "Team",
            name: "Engineering"
        },
        {
            category: "Employee",
            team: "Marketing",
            name: "Olivia Rhye"
        },
        {
            category: "Employee",
            team: "Research & Development",
            name: "Samuel Harris"
        },
        {
            category: "Employee",
            team: "Finance",
            name: "Marcus Drake"
        },
        {
            category: "Employee",
            team: "Research & Development",
            name: "Ashley Collins"
        },
        {
            category: "Employee",
            team: "Engineering",
            name: "Darrell Smith"
        },
        {
            category: "Employee",
            team: "Marketing",
            name: "Simon West"
        },
        {
            category: "Employee",
            team: "Research & Development",
            name: "Barry Singh"
        }
    ];

    //Automatically adjust or validate dates to ensure a valid period is set
    useEffect(() => {
        if (!isValidPeriod(newSurvey.startDate, newSurvey.endDate)) {
            setNewSurvey({...newSurvey, endDate: newSurvey.startDate});
        }
    }, [newSurvey.startDate]);

    useEffect(() => {
        if (!isValidPeriod(newSurvey.startDate, newSurvey.endDate)) {
            setNewSurvey({...newSurvey, startDate: newSurvey.endDate});
        }
    }, [newSurvey.endDate]);

    useEffect(() => {
        if (Object.entries(validation).some((value) => value[1])) {
            setTimeout(() => setValidation({
                1: false,
                2: false,
                3: false,
                4: false
            }), "5000");
        }
    }, [validation]);

    //Function for navigating to the previous page
    function previousPage() {
        if (pageNumber === 1) {
            close();
        }
        else {
            setPageNumber(pageNumber - 1);
        }
    };

    //Function for navigating to the next page if requirements are met
    function nextPage() {
        if (pageNumber === 1 && !newSurvey.surveyName) {
            setValidation({
                ...validation,
                [1]: true
            });
        }
        else if (pageNumber === 2 && (!newSurvey.welcomeScreenTitle || !newSurvey.endScreenTitle)) {
            setValidation({
                ...validation,
                [2]: true
            });
        }
        else if (pageNumber === 3 && newSurvey.questions.length === 0) {
            setValidation({
                ...validation,
                [3]: true
            });
        }
        else if (pageNumber === 4 && newSurvey.recipients.length === 0) {
            setValidation({
                ...validation,
                [4]: true
            });
        }
        else if (pageNumber === 5) {
            handleSubmit();
        }
        else {
            setPageNumber(pageNumber + 1);
        }
    };

    //Function for submitted the new survey
    function handleSubmit() {
        close();
    };

    //Function for adding a new question to the survey
    function addQuestion(questionText) {
        if (questionText) {
            setNewSurvey({
                ...newSurvey,
                questions: [
                    ...newSurvey.questions,
                    {
                        index: newSurvey.questions.length,
                        question: questionText
                    }
                ]
            })
        }
    };

    //Function for adding a new recipient for the survey
    function addRecipient(option) {
        if (option.category === "Team") {
            let newRecipients;
            if (option.name === "Everyone") {
                newRecipients = recipientOptions.filter(
                    (rec) => rec.team && newSurvey.recipients.every((rec2) => rec.name !== rec2.name)
                );
            }
            else {
                newRecipients = recipientOptions.filter(
                    (rec) => rec.team === option.name && newSurvey.recipients.every((rec2) => rec.name !== rec2.name)
                );
            }
            
            newRecipients.forEach((rec) => rec.id = uuidv4());

            setNewSurvey({
                ...newSurvey, 
                recipients: [
                    ...newSurvey.recipients,
                    ...newRecipients
                ]
            });
        
        }
        else if (option.category === "Employee") {
            setNewSurvey({
                ...newSurvey,
                recipients: [
                    ...newSurvey.recipients,
                    {
                        ...option,
                        id: uuidv4()
                    }
                ]
            });
        }
        //console.log(newSurvey.recipients);
    };

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

    const Header4 = styled("h4")({
        marginBottom: "10px"
    });

    return (
        <Box sx={{...{
            width: "520px",
            padding: "30px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Title*/}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{marginBottom: "40px"}}
            >
                {pageNumber <= 4 ? 
                    <h3>Create new survey ({pageNumber}/4)</h3> : 
                    <h3>Review survey</h3>
                }
                <CloseIcon onClick={close} sx={{
                    backgroundColor: "#FFFFFF",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#D0D5DD"
                    }
                }}/>
            </Stack>
            {/*Popup content*/}
            {/*Page 1: Choosing survey name*/}
            {pageNumber === 1 &&
                <>
                    <Header4>Internal survey name<span style={{color: "red"}}>*</span></Header4>
                    <TextField 
                        value={newSurvey.surveyName}
                        error={validation[1]}
                        placeholder="Survey name"
                        onChange={(e) => setNewSurvey({...newSurvey, surveyName: e.target.value})}
                        helperText={validation[1] ? "Required": null}
                        sx={{ 
                            width: "100%",
                            marginBottom: "50px",
                        }}
                    />
                    {/*
                    <Stack 
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{
                            marginBottom: "10px"
                        }}
                    >
                        <Checkbox 
                            type="checkbox"
                            id="usePrevious"
                            name="usePrevious"
                            value="usePrevious"
                            size="large"
                            onChange={() => setUsePrevious(!usePrevious)}
                            style={{ marginRight: "10px" }}
                        />
                        <p>Use previous</p>
                    </Stack>
                    <Select sx={{ 
                        width: "100%", 
                        marginBottom: "20px" 
                    }}>
                        <MenuItem value="Previous Survey 1">Previous Survey 1</MenuItem>
                        <MenuItem value="Previous Survey 2">Previous Survey 2</MenuItem>
                    </Select>
                    */}
                </>
            }
            {/*Page 2: Entering titles, messages and starting and ending dates*/}
            {pageNumber === 2 &&
                <>
                    {/*Textfields for welcome screen title and message*/}
                    <Header4>Welcome screen title<span style={{color: "red"}}>*</span></Header4>
                    <TextField 
                        value={newSurvey.welcomeScreenTitle}
                        error={validation[2] && !newSurvey.welcomeScreenTitle}
                        placeholder="Welcome screen title"
                        onChange={(e) => setNewSurvey({...newSurvey, welcomeScreenTitle: e.target.value})}
                        helperText={(validation[2] && !newSurvey.welcomeScreenTitle) ? "Required" : null}
                        sx={{ 
                            width: "100%",
                            marginBottom: "20px" 
                        }}
                    />
                    <Header4>Welcome screen message</Header4>
                    <TextField 
                        value={newSurvey.welcomeScreenMessage}
                        placeholder="Enter welcome screen message..."
                        multiline
                        rows={4}
                        onChange={(e) => setNewSurvey({...newSurvey, welcomeScreenMessage: e.target.value})}
                        sx={{ 
                            width: "100%",
                            marginBottom: "40px"
                        }}
                    />
                    {/*Textfields for end screen title and message*/}
                    <Header4>End screen title<span style={{color: "red"}}>*</span></Header4>
                    <TextField 
                        value={newSurvey.endScreenTitle}
                        error={validation[2] && !newSurvey.endScreenTitle}
                        placeholder="End screen title"
                        onChange={(e) => setNewSurvey({...newSurvey, endScreenTitle: e.target.value})}
                        helperText={(validation[2] && !newSurvey.endScreenTitle) ? "Required" : null}
                        sx={{
                            width: "100%",
                            marginBottom: "20px"
                        }}
                    />
                    <Header4>End screen message</Header4>
                    <TextField 
                        value={newSurvey.endScreenMessage}
                        placeholder="Enter end screen message..."
                        multiline
                        rows={4}
                        onChange={(e) => setNewSurvey({...newSurvey, endScreenMessage: e.target.value})}
                        sx={{
                            width: "100%",
                            marginBottom: "20px"
                        }}
                    />
                    {/*Components for selecting starting and ending dates*/}
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={4}
                        sx={{ marginBottom: "40px" }}
                    >
                        <Box>
                            <Header4>Start date</Header4>
                            <Chip 
                                icon={<CalendarMonthIcon />}
                                label={formatDate(newSurvey.startDate)}
                                variant="outlined"
                                onClick={() => setOpenStartDate(true)}
                                disableTouchRipple
                                sx={{ borderRadius: "4px" }}
                            />
                        </Box>
                        <Box>
                            <Header4>End date</Header4>
                            <Chip 
                                icon={<CalendarMonthIcon />}
                                label={formatDate(newSurvey.endDate)}
                                variant="outlined"
                                onClick={() => setOpenEndDate(true)}
                                disableTouchRipple
                                sx={{ borderRadius: "4px" }}
                            />
                        </Box>
                    </Stack>
                </>
            }
            {/*Page 3: Adding survey questions*/}
            {pageNumber === 3 &&
                <>
                    <h5 style={{ marginBottom: "10px" }}>Survey questions</h5>
                    <Stack
                        direction="row"
                        alignItems="flex-start"
                        spacing={2}
                        sx={{ marginBottom: "10px" }}
                    >
                        {/*Textfield and button for adding a new survey question*/}
                        <TextField
                            value={newQuestionText}
                            placeholder="New question text"
                            size="small"
                            rows={4}
                            multiline
                            onChange={(e) => setNewQuestionText(e.target.value)}
                            sx={{
                                width: "100%"
                            }}
                        />
                        <HRMButton 
                            mode="secondaryB" 
                            onClick={() => addQuestion(newQuestionText)}
                            style={{ width: "110px" }}
                        >
                            <b style={{ color: colors.darkGrey }}>Add new</b>
                        </HRMButton>
                    </Stack>
                    {/*List of added survey questions*/}
                    {newSurvey.questions.length > 0 ? 
                        <QuestionsList 
                            questions={newSurvey.questions} 
                            setQuestions={(questions) => setNewSurvey({...newSurvey, questions})}
                            style={{ marginBottom: "20px" }} 
                        /> :
                        <Header4>No questions have been added</Header4>
                    }
                </>
            }
            {/*Page 4: Adding survey recipients*/}
            {pageNumber === 4 && 
                <>
                    <h5>Survey recipients</h5>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ marginBottom: "20px" }}
                    >
                        <Autocomplete 
                            value={newRecipient}
                            options={recipientOptions}
                            groupBy={(option) => option.category}
                            getOptionLabel={(option) => option.name}
                            onChange={(e, newValue) => setNewRecipient(newValue)}
                            sx={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <HRMButton 
                            mode="secondaryB" 
                            onClick={() => addRecipient(newRecipient)}
                            style={{ width: "110px" }}
                        >
                            <b style={{ color: colors.darkGrey }}>Add new</b>
                        </HRMButton>
                    </Stack>
                    {newSurvey.recipients.length > 0 ?
                        <RecipientsList 
                            recipients={newSurvey.recipients} 
                            setRecipients={(newRecipients) => setNewSurvey({...newSurvey, recipients: newRecipients})}
                            style={{ marginBottom: "20px" }}
                        /> :
                        <Header4>No recipients have been added</Header4>
                    }
                </>
            }
            {/*Page 5: Reviewing survey details*/}
            {pageNumber === 5 && 
                <>
                    {/*Welcome screen title and message*/}
                    <h5>Welcome screen title</h5>
                    <p style={{ marginBottom: "40px" }}>{newSurvey.welcomeScreenTitle}</p>
                    <h5>Welcome screen message</h5>
                    <p style={{ marginBottom: "40px" }}>
                        {newSurvey.welcomeScreenMessage ? 
                            newSurvey.welcomeScreenMessage : 
                            <i>No welcome screen message was provided</i>
                        }
                    </p>
                    {/*End screen title and message*/}
                    <h5>End screen title</h5>
                    <p style={{ marginBottom: "40px" }}>{newSurvey.endScreenTitle}</p>
                    <h5>End screen message</h5>
                    <p style={{ marginBottom: "40px" }}>
                        {newSurvey.endScreenMessage ? 
                            newSurvey.endScreenMessage :
                            <i>No end screen message was provided</i>
                        }
                    </p>
                    {/*Start and end dates*/}
                    <h5>Start date</h5>
                    <p style={{ marginBottom: "40px" }}>
                        {formatDate(newSurvey.startDate)}
                    </p>
                    <h5>End date</h5>
                    <p style={{ marginBottom: "40px" }}>
                        {formatDate(newSurvey.endDate)}
                    </p>
                    {/*Survey questions*/}
                    <h5>Survey questions</h5>
                    <TableContainer sx={{ marginBottom: "40px" }}>
                        <Table>
                            <TableBody>
                                {newSurvey.questions.sort((q1, q2) => q1.index - q2.index).map((q) => (
                                    <TableRow>
                                        <TableBodyCell>
                                            <p>{q.question}</p>
                                        </TableBodyCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/*Survey recipients*/}
                    <h5>Survey recipients</h5>
                    <TableContainer sx={{ marginBottom: "40px" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell><b>Name</b></TableHeaderCell>
                                    <TableHeaderCell><b>Team</b></TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {newSurvey.recipients.map((rec) => (
                                    <TableRow>
                                        <TableBodyCell><p>{rec.name}</p></TableBodyCell>
                                        <TableBodyCell><p>{rec.team}</p></TableBodyCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
            {/*Validation messages to inform user of survey requirements*/}
            {validation[3] && 
                <h4 style={{ color: "#D92D20", marginBottom: "20px" }}>
                    Survey must have at least one question
                </h4>
            }
            {validation[4] &&
                <h4 style={{ color: "#D92D20", marginBottom: "20px" }}>
                    Survey must have at least one recipient
                </h4>
            }
            {/*Navigation buttons*/}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={2}
            >
                <HRMButton mode="secondaryB" onClick={previousPage}>
                    {pageNumber === 1 ? "Cancel" : "Previous"}
                </HRMButton>
                <HRMButton mode="primary" onClick={nextPage}>
                    {pageNumber === 5 ? "Send" : "Next"}
                </HRMButton>
            </Stack>
            {/*Popup components for setting the starting and ending dates of the new survey*/}
            <Dialog open={openStartDate} onClose={() => setOpenStartDate(false)}>
                <DateSelect 
                    close={() => setOpenStartDate(false)} 
                    setDate={(date) => setNewSurvey({...newSurvey, startDate: date})}
                    initialValue={newSurvey.startDate}
                />
            </Dialog>
            <Dialog open={openEndDate} onClose={() => setOpenEndDate(false)}>
                <DateSelect 
                    close={() => setOpenEndDate(false)}
                    setDate={(date) => setNewSurvey({...newSurvey, endDate: date})}
                    initialValue={newSurvey.endDate}
                />
            </Dialog>
        </Box>
    );
};

//Control panel settings for storybook
NewSurveyPopup.propTypes = {
    //Function for closing this popup component
    close: PropTypes.func
};

//Default values for this component
NewSurveyPopup.defaultProps = {
    style: {}
};