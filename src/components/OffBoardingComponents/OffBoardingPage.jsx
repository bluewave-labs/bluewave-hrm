import React, { useContext } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import { Step, StepLabel, Stepper } from "@mui/material";
import { multiStepContext } from "../../context/stepContext";
import FinalStep from "./FinalStep";
import {
  bgcolor,
  Box,
  display,
  height,
  margin,
  padding,
  textAlign,
  width,
} from "@mui/system";

function OffBoardingPage() {
  const { currentStep } = useContext(multiStepContext);
  const stepStyle = {
    "&.MuiStepper-root": {
      padding: "50px 50px",
    },
    "& .MuiStepConnector-line": {
      marginTop: "-15px",
      width: "100%",
    },
    "& .Mui-active": {
      "&.MuiStepIcon-root": {
        color: "#7F56D9",
      },
      "& .MuiStepConnector-line": {
        border: "1px solid #7f56d9",
      },
      "& .MuiSvgIcon-root": {
        fontSize: "30px",
      },
    },
    "& .Mui-completed": {
      "&.MuiStepIcon-root": {
        color: "#7F56D9",
      },
      "& .MuiStepConnector-line": {
        border: "1px solid #7f56d9",
      },
      "& .MuiSvgIcon-root": {
        fontSize: "30px",
      },
    },
    "& .MuiStepLabel-root": {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      "& .MuiStepLabel-label": {
        marginTop: "10px",
      },
    },
  };
  function showstep(step) {
    switch (step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      case 4:
        return <FinalStep />;
    }
  }
  return (
    <>
      <Box
        width={"1003px"}
        margin={"20px auto"}
        paddingInline={0}
        sx={{ border: "2px solid #ebebeb" }}
      >
        <Stepper
          activeStep={currentStep - 1}
          orientation="horizontal"
          sx={stepStyle}
        >
          <Step>
            <StepLabel>Start</StepLabel>
          </Step>
          <Step>
            <StepLabel>Sign and Upload</StepLabel>
          </Step>
          <Step>
            <StepLabel>Complete questionnaire </StepLabel>
          </Step>
          <Step>
            <StepLabel>Finish </StepLabel>
          </Step>
        </Stepper>
      </Box>
      {showstep(currentStep)}
    </>
  );
}

export default OffBoardingPage;
