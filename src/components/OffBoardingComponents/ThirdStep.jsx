import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import HRMButton from "../Button/HRMButton";
import { multiStepContext } from "../../context/stepContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

function ThirdStep() {
  const { currentStep, setCurrentStep, finalData, setFinalData } = useContext(multiStepContext);


  const handleNext = () => {
    
    setCurrentStep(4)
    console.log(finalData)
  }

  
  return (
    <Box
      width={"1003px"}
      margin={"0 auto"}
      textAlign={"center"}
      sx={{ border: "2px solid #ebebeb" }}
    >
      <Typography
        variant="h1"
        fontSize={"16px"}
        fontWeight={600}
        margin={"20px auto"}
      >
        Answer below questions as detailed as possible
      </Typography>
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        margin={"0 auto 20px auto"}
      >
        Your answers are going to be used to further improve our processs.
      </Typography>
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        margin={"80px auto 20px auto"}
        textAlign={'left'}
        width={"70%"}
      >
        What suggestions do you have for improving the company culture or work environment?
      </Typography>

      <TextField
        style={{ textAlign: "left", width:"70%", margin:"0 auto" }}
        label="[Answer]"
        multiline
        rows={3}
        value={finalData['QuestionOne']}
        onChange={(e)=>{setFinalData({...finalData,"QuestionOne":e.target.value})}}
      />
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        margin={"80px auto 20px auto"}
        textAlign={'left'}
        width={"70%"}
      >
        Do you have any feedback on your manager or team that you'd like to share?
      </Typography>

      <TextField
        style={{ textAlign: "left", width:"70%", margin:"0 auto" }}
        label="[Answer]"
        multiline
        rows={3}
        value={finalData['QuestionTwo']}
        onChange={(e)=>{setFinalData({...finalData,"QuestionTwo":e.target.value})}}
         
      />
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        margin={"80px auto 20px auto"}
        textAlign={'left'}
        width={"70%"}
      >
        How was your experience working here?
      </Typography>

      <TextField
        style={{ textAlign: "left", width:"70%", margin:"0 auto" }}
        label="[Answer]"
        multiline
        rows={3}
        value={finalData['QuestionThree']}
        onChange={(e)=>{setFinalData({...finalData,"QuestionThree":e.target.value})}}
      />
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        margin={"80px auto 20px auto"}
        textAlign={'left'}
        width={"70%"}
      >
        Do you have any feedback on your manager or team that you'd like to share?
      </Typography>

      <TextField
        style={{ textAlign: "left", width:"70%", margin:"0 auto" }}
        label="[Answer]"
        multiline
        rows={3}
        value={finalData['QuestionFour']}
        onChange={(e)=>{setFinalData({...finalData,"QuestionFour":e.target.value})}}
      />
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        margin={"80px auto 20px auto"}
        textAlign={'left'}
        width={"70%"}
      >
        Is there anything else you would like to share that we haven’t discussed?
      </Typography>

      <TextField
        style={{ textAlign: "left", width:"70%", margin:"0 auto" }}
        label="[Answer]"
        multiline
        rows={3}
        value={finalData['QuestionFive']}
        onChange={(e)=>{setFinalData({...finalData,"QuestionFive":e.target.value})}}
      />
      <br/>

      <HRMButton
        mode={"secondaryA"}
        style={{
          padding: "10px",
          width: "132px",
          height: "32px",
          margin: "20px",
          fontSize:"13px",
        }}
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        Previous
      </HRMButton>
      <HRMButton
        mode={"primary"}
        style={{
          padding: "10px",
          width: "132px",
          height: "32px",
          margin: "20px",
          fontSize:"13px",
        }}
        onClick={handleNext}
      >
        Save and next
      </HRMButton>
    </Box>
  );
}

export default ThirdStep;
