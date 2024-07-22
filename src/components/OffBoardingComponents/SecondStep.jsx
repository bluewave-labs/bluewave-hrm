import { Button, Typography } from "@mui/material";
import { Box, fontSize } from "@mui/system";
import React, { useContext } from "react";
import HRMButton from "../Button/HRMButton";
import { multiStepContext } from "../../context/stepContext";
import HRMButtonGroup from "../ButtonGroup/HRMButtonGroup";

function SecondStep() {
  const { currentStep, setCurrentStep } = useContext(multiStepContext);
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
        Download documents below, sign them and upload again
      </Typography>
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        margin={"0 auto 20px auto"}
      >
        You can sign digitally or manually by printing and scanning as you wish.
      </Typography>
      {/* Logic for upload documents */}

      <HRMButton
        mode={"primary"}
        style={{
          padding: "0px var(--spacing-xxs) 0px var(--spacing-xxs)",
          fontSize:"13px",
          width: "132px",
          height: "32px",
          margin: "0 auto 20px auto",
        }}
        onClick={() => setCurrentStep(3)}
      >
        Save and next
      </HRMButton>
    </Box>
  );
}

export default SecondStep;
