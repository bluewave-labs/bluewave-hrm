import Box from "@mui/system/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomizedSteppers from "../CustomizedSteppers";
import IntroductoryMessage from "./IntroductoryMessage";
import OnboardingVideos from "./OnboardingVideos";
import OnboardingDocuments from "./OnboardingDocuments";
import OnboardingTasks from "./OnboardingTasks";
import OnboardingSurvey from "./OnboardingSurvey";
import OnboardingSuccessful from "./OnboardingSuccessful";

/**
 * Onboarding page for new employees.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function OnboardingPage({style}) {
    //Onboarding status object which holds all the information necessary for the onboarding process
    const [onboardingStatus, setOnboardingStatus] = useState({
        stepNumber: 0,
        videos: [
            {title: "Company Values", src: "https://www.youtube.com/embed/lJIrF4YjHfQ?si=6NAlVmp0iY94PIfx"},
            {title: "Company Values", src: "https://www.youtube.com/embed/lJIrF4YjHfQ?si=6NAlVmp0iY94PIfx"}
        ],
        watchedVideos: false,
        files: [{name: "Job Offer"}, {name: "NDA"}],
        readDocuments: false,
        tasks: [
            {
                name: "Discuss and set your first 30/60/90-day goals with your manager",
                done: false,
                index: 0
            },
            {
                name: "Complete personal info & documents on Bluewave HRM",
                done: false,
                index: 1
            },
            {
                name: "Sign and submit essential documents",
                done: false,
                index: 2
            }
        ],
        survey: {
            "What suggestions do you have for improving the company culture or work environment?": "",
            "Do you have any feedback on your manager or team that you\'d like to share?": "",
            "How was your experience working here?": "",
            "Is there anything else you would like to share that we haven\'t discussed?": "" 
        }
    });

    const navigate = useNavigate();

    //Function for transitioning to the previous step
    function previousPage() { 
        setOnboardingStatus({...onboardingStatus, stepNumber: onboardingStatus.stepNumber - 1}); 
        console.log(onboardingStatus);
    };

    //Function for transitioning to the next step
    function nextPage() { 
        setOnboardingStatus({...onboardingStatus, stepNumber: onboardingStatus.stepNumber + 1});
        console.log(onboardingStatus);
    };

    //Function for saving onboarding process for later
    function save() {
        //console.log("Executing save() function");
        navigate("/dashboard", { replace: true });
    };

    //Labels for each onboarding step
    const steps = [
        {label: "Start"},
        {label: "Videos"},
        {label: "Readings"},
        {label: "To-dos"},
        {label: "Survey"},
        {label: "Finish"}
    ]

    return (
        <Box sx={{...{
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            paddingX: "20%",
            paddingY: "50px",
            backgroundColor: "#FCFCFD"
        }, ...style}}>
            {/*Steps overview*/}
            <CustomizedSteppers 
                stepnumber={onboardingStatus.stepNumber} 
                steps={steps} 
                style={{
                    marginBottom: "50px"
                }} 
            />
            {/*Introduction page*/}
            {onboardingStatus.stepNumber === 0 && <IntroductoryMessage next={nextPage} save={save} />}
            {/*Videos page*/}
            {onboardingStatus.stepNumber === 1 && 
                <OnboardingVideos 
                    prev={previousPage} 
                    next={nextPage} 
                    save={save} 
                    videos={onboardingStatus.videos} 
                    watchedVideos={onboardingStatus.watchedVideos}
                    setWatchedVideos={(value) => setOnboardingStatus({...onboardingStatus, watchedVideos: value})}
                />
            }
            {/*Documents page*/}
            {onboardingStatus.stepNumber === 2 && 
                <OnboardingDocuments 
                    prev={previousPage} 
                    next={nextPage} 
                    save={save}
                    files={onboardingStatus.files}
                    readDocuments={onboardingStatus.readDocuments}
                    setReadDocuments={(value) => setOnboardingStatus({...onboardingStatus, readDocuments: value})}
                />
            }
            {/*To-do page*/}
            {onboardingStatus.stepNumber === 3 && 
                <OnboardingTasks 
                    prev={previousPage} 
                    next={nextPage} 
                    save={save}
                    tasks={onboardingStatus.tasks}
                    setTasks={(value) => setOnboardingStatus({...onboardingStatus, tasks: value})}
                />
            }
            {/*Survey page*/}
            {onboardingStatus.stepNumber === 4 && 
                <OnboardingSurvey 
                    prev={previousPage} 
                    next={nextPage} 
                    save={save}
                    survey={onboardingStatus.survey}
                    setSurvey={(value) => setOnboardingStatus({...onboardingStatus, survey: value})}
                />
            }
            {/*Success page*/}
            {onboardingStatus.stepNumber === 5 && <OnboardingSuccessful />}
        </Box>
    );
};

//Control panel settings for storybook
OnboardingPage.propTypes = {};

//Default values for this component
OnboardingPage.defaultProps = {
    style: {}
};