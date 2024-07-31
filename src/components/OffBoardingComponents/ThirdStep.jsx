import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import HRMButton from "../Button/HRMButton";
import { multiStepContext } from "../../context/stepContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


function ThirdStep() {
  const { currentStep, setCurrentStep, finalData, setFinalData } =
    useContext(multiStepContext);

  const handleNext = () => {
    setCurrentStep(4);
    console.log(finalData);
  };

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
        textAlign={"left"}
        width={"70%"}
      >
        What suggestions do you have for improving the company culture or work
        environment?
      </Typography>

      <TextField
        style={{ textAlign: "left", width: "70%", margin: "0 auto" }}
        label="[Answer]"
        multiline
        rows={3}
        value={finalData["answer1"]}
        onChange={(e) => {
          setFinalData({ ...finalData, answer1: e.target.value });
        }}
      />
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        margin={"80px auto 20px auto"}
        textAlign={"left"}
        width={"70%"}
      >
        Do you have any feedback on your manager or team that you'd like to
        share?
      </Typography>

      <TextField
        style={{ textAlign: "left", width: "70%", margin: "0 auto" }}
        label="[Answer]"
        multiline
        rows={3}
        value={finalData["answer2"]}
        onChange={(e) => {
          setFinalData({ ...finalData, answer2: e.target.value });
        }}
      />
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        margin={"80px auto 20px auto"}
        textAlign={"left"}
        width={"70%"}
      >
        How was your experience working here?
      </Typography>

      <TextField
        style={{ textAlign: "left", width: "70%", margin: "0 auto" }}
        label="[Answer]"
        multiline
        rows={3}
        value={finalData["answer3"]}
        onChange={(e) => {
          setFinalData({ ...finalData, answer3: e.target.value });
        }}
      />
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        margin={"80px auto 20px auto"}
        textAlign={"left"}
        width={"70%"}
      >
        Do you have any feedback on your manager or team that you'd like to
        share?
      </Typography>

      <TextField
        style={{ textAlign: "left", width: "70%", margin: "0 auto" }}
        label="[Answer]"
        multiline
        rows={3}
        value={finalData["answer4"]}
        onChange={(e) => {
          setFinalData({ ...finalData, answer4: e.target.value });
        }}
      />
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        margin={"80px auto 20px auto"}
        textAlign={"left"}
        width={"70%"}
      >
        Is there anything else you would like to share that we haven’t
        discussed?
      </Typography>

      <TextField
        style={{ textAlign: "left", width: "70%", margin: "0 auto" }}
        label="[Answer]"
        multiline
        rows={3}
        value={finalData["answer5"]}
        onChange={(e) => {
          setFinalData({ ...finalData, answer5: e.target.value });
        }}
      />
      <br />

      <div style={{display:"flex",justifyContent:"space-around", margin:"50px 0"}}>
        <HRMButton
          mode={"secondaryA"}
          style={{
            padding: "10px",
            width: "132px",
            height: "32px",
         
            fontSize: "13px",
          }}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          <ArrowBackIcon sx={{padding:"2px"}}></ArrowBackIcon>Previous
        </HRMButton>
        <HRMButton
          mode={"primary"}
          style={{
            padding: "10px",
            width: "132px",
            height: "32px",
            fontSize: "13px",
          }}
          onClick={handleNext}
        >
          Save and next
        </HRMButton>
      </div>
    </Box>
  );
}

export default ThirdStep;
