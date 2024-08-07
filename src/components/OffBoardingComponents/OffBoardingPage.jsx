import React, { useContext, useEffect } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import { multiStepContext } from "../../context/stepContext";
import FinalStep from "./FinalStep";
import { Box } from "@mui/system";
import CustomizedSteppers from "../CustomizedSteppers/CustomizedSteppers";

function OffBoardingPage() {
  const { currentStep, finalData } = useContext(multiStepContext);
  // useEffect(() => {
  //   console.log("DATA>>>", finalData);
  // });

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
        height={"166px"}
        margin={"125px auto 49px auto"}
        sx={{
          border: "2px solid #ebebeb",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CustomizedSteppers
          stepnumber={currentStep - 1}
          steps={[
            { label: "Start", description: "" },
            { label: "Sign and Upload", description: "" },
            { label: "Complete questionnaire", description: "" },
            { label: "Finish", description: "" },
          ]}
        />
      </Box>
      {showstep(currentStep)}
    </>
  );
}

export default OffBoardingPage;
