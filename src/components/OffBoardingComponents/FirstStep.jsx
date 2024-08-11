import { Box, margin } from "@mui/system";
import React, { useContext } from "react";
import "./OffBoardingPage.css";
import HRMButton from "../Button/HRMButton";
import { Typography } from "@mui/material";
import { multiStepContext } from "../../context/stepContext";

function FirstStep() {
  const { setCurrentStep } = useContext(multiStepContext);
  return (
    <Box
      width={"1003px"}
      margin={"0 auto"}
      textAlign={"center"}
      sx={{ border: "2px solid #ebebeb" }}
    >
      <Typography variant="h1" fontSize={"16px"} fontWeight={600} margin={'20px auto'}>
        Offboarding Process
      </Typography>
      <Typography fontSize={"13px"} fontWeight={400} width={'70%'} margin={'0 auto 20px auto'}>
        As part of our offboarding process, we want to ensure that everything
        proceeds smoothly for you. If you have any questions about the
        offboarding process or require assistance with anything, please do not
        hesitate to reach out to [HR Contact Name] at [HR Contact Email] or [HR
        Contact Phone Number]. We want to take this opportunity to thank you for
        your dedication and contributions to [Company Name]. We wish you all the
        best in your future endeavors and hope our paths cross again.
      </Typography>
      <HRMButton
        mode={"primary"}
        style={{ padding: "10px", width: "132px", height: "32px", margin:"0 auto 20px auto"}}
        onClick={() => setCurrentStep(2)}
      >
        Next
      </HRMButton>
    </Box>
  );
}

export default FirstStep;
