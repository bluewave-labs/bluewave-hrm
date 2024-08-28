import React, { useContext } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import { multiStepContext } from "../../context/stepContext";
import FinalStep from "./FinalStep";
import { Box } from "@mui/system";
import CustomizedSteppers from "../CustomizedSteppers/CustomizedSteppers";

function OffBoardingPage() {
  const { currentStep } = useContext(multiStepContext);
  // useEffect(() => {
  //   console.log("DATA>>>", finalData);
  // });

  function showstep(step) {
    switch (step) {
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      case 4:
        return <FinalStep />;
      default:
        return <FirstStep />;
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
