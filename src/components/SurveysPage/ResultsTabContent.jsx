import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import HRMButton from "../Button/HRMButton";
import SurveysTable from "./SurveysTable";
import SurveyDetails from "./SurveyDetails";
import NewSurveyPopup from "./NewSurveyPopup";
import { colors, fonts } from "../../Styles";

/**
 * Displays the content for the results tab in the surveys menu.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function ResultsTabContent({style}) {
    //The currently selected survey to be viewed (is null when no survey is selected)
    const [survey, setSurvey] = useState(null);
    //Flag determining whether the popup for creating a new survey should be displayed
    const [openNewSurvey, setOpenNewSurvey] = useState(false);
    
    const surveyList = [
        {
            name: "Q2 2024 General",
            startDate: "Jan 20, 2024",
            finishDate: "Jan 20, 2024",
            answered: "3 times",
            information: [
                {
                    field: "Welcome screen title",
                    answer: "Satisfaction Survey 2024"
                },
                {
                    field: "Welcome screen message",
                    answer: "Thank you for taking the time to provide feedback. Your input is invaluable in helping us improve your experience at [Company Name]. Please be honest in your responses, as your feedback will remain confidential."
                },
                {
                    field: "Finish screen title",
                    answer: "Satisfaction Survey 2024"
                },
                {
                    field: "Finish screen message",
                    answer: "Thank you for taking the time to provide feedback. Your input is invaluable in helping us improve your experience at [Company Name]. Please be honest in your responses, as your feedback will remain confidential."
                },
                {
                    field: "Start date:",
                    answer: "1 January 2024"
                },
                {
                    field: "Finish date:",
                    answer: "1 January 2024"
                }
            ],
            responses: [
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Marcus Drake",
                    team: "Finance",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer2"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "sadgaskjgfaskjf"
                        }
                    ]
                },
                {
                    name: "Ashley Collins",
                    team: "Research & Development",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer3"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Answer4"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas fugiat nulla quae voluptas atque voluptate omnis explicabo placeat perspiciatis aspernatur at sint magni possimus dolorem harum, quam voluptatibus optio numquam."
                        }
                    ]
                }
            ]
        },
        {
            name: "Manager Satisfaction",
            startDate: "Jan 20, 2024",
            finishDate: "Jan 20, 2024",
            answered: "45 times",
            information: [
                {
                    field: "Welcome screen title",
                    answer: "Satisfaction Survey 2024"
                },
                {
                    field: "Welcome screen message",
                    answer: "Thank you for taking the time to provide feedback. Your input is invaluable in helping us improve your experience at [Company Name]. Please be honest in your responses, as your feedback will remain confidential."
                },
                {
                    field: "Finish screen title",
                    answer: "Satisfaction Survey 2024"
                },
                {
                    field: "Finish screen message",
                    answer: "Thank you for taking the time to provide feedback. Your input is invaluable in helping us improve your experience at [Company Name]. Please be honest in your responses, as your feedback will remain confidential."
                },
                {
                    field: "Start date:",
                    answer: "1 January 2024"
                },
                {
                    field: "Finish date:",
                    answer: "1 January 2024"
                }
            ],
            responses: [
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Marcus Drake",
                    team: "Finance",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer2"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "sadgaskjgfaskjf"
                        }
                    ]
                },
                {
                    name: "Ashley Collins",
                    team: "Research & Development",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer3"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Answer4"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas fugiat nulla quae voluptas atque voluptate omnis explicabo placeat perspiciatis aspernatur at sint magni possimus dolorem harum, quam voluptatibus optio numquam."
                        }
                    ]
                }
            ]
        },
        {
            name: "Newcomers Survey",
            startDate: "Jan 20, 2024",
            finishDate: "Jan 20, 2024",
            answered: "45 times",
            information: [
                {
                    field: "Welcome screen title",
                    answer: "Satisfaction Survey 2024"
                },
                {
                    field: "Welcome screen message",
                    answer: "Thank you for taking the time to provide feedback. Your input is invaluable in helping us improve your experience at [Company Name]. Please be honest in your responses, as your feedback will remain confidential."
                },
                {
                    field: "Finish screen title",
                    answer: "Satisfaction Survey 2024"
                },
                {
                    field: "Finish screen message",
                    answer: "Thank you for taking the time to provide feedback. Your input is invaluable in helping us improve your experience at [Company Name]. Please be honest in your responses, as your feedback will remain confidential."
                },
                {
                    field: "Start date:",
                    answer: "1 January 2024"
                },
                {
                    field: "Finish date:",
                    answer: "1 January 2024"
                }
            ],
            responses: [
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Olivia Rhye",
                    team: "Marketing",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer1"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eveniet, molestias perspiciatis eos cumque earum fugiat vel officiis odit rerum quaerat facere, commodi quod itaque, officia facilis cum eaque quae!"
                        }
                    ]
                },
                {
                    name: "Marcus Drake",
                    team: "Finance",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer2"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla officiis nisi consequatur vitae eius earum dolores aut, aliquid quisquam magni similique quia placeat, temporibus hic, ex officia deleniti commodi?"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "sadgaskjgfaskjf"
                        }
                    ]
                },
                {
                    name: "Ashley Collins",
                    team: "Research & Development",
                    response: [
                        {
                            question: "What suggestions do you have for improving the company culture or work environment?",
                            answer: "Answer3"
                        },
                        {
                            question: "Do you have any feedback on your manager or team that you'd like to share?",
                            answer: "Answer4"
                        },
                        {
                            question: "How was your experience working here?",
                            answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas fugiat nulla quae voluptas atque voluptate omnis explicabo placeat perspiciatis aspernatur at sint magni possimus dolorem harum, quam voluptatibus optio numquam."
                        }
                    ]
                }
            ]
        }
    ];

    return (
        <Box sx={{...{
            marginTop: "40px",
            colors: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {survey ?
                <>
                    {/*If a survey is selected, information on the currently selected survey is shown*/}
                    <SurveyDetails survey={survey} back={() => setSurvey(null)} />
                </> :
                <>
                    {/*Otherwise, a table displaying all the surveys is shown*/}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            marginBottom: "16px",
                            minWidth: "792px"
                        }}
                    >
                        <h3>Surveys</h3>
                        <HRMButton mode="primary" onClick={() => setOpenNewSurvey(true)}>Send new survey</HRMButton>
                    </Stack> 
                    <SurveysTable surveyList={surveyList} setSurvey={setSurvey} />
                </>
            }
            {/*Popup component for creating a new survey*/}
            <Dialog open={openNewSurvey} onClose={() => setOpenNewSurvey(false)}>
                <NewSurveyPopup close={() => setOpenNewSurvey(false)} />
            </Dialog>
        </Box>

    );
};

//Control panel settings for storybook
ResultsTabContent.propTypes = {};

//Default values for this component
ResultsTabContent.defaultProps = {
    style: {}
};