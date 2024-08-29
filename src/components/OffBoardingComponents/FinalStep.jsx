import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import HRMButton from "../Button/HRMButton";
import { multiStepContext } from "../../context/stepContext";
import thankYouVector from "../../Images/placeholder.svg";
import axios from "axios";

function FinalStep() {
  const { finalData } = useContext(multiStepContext);
  const handleSubmit = async () => {
    const {
      empId,
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      SignedDocumentAck,
    } = finalData;
    const uploadData = {
      empId,
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      SignedDocumentAck,
      isCompleted: true,
    };
    const response = await axios.post(
      "http://localhost:5000/api/offboarding",
      JSON.stringify(uploadData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  };
  return (
    <Box
      width={"1003px"}
      margin={"0 auto"}
      textAlign={"center"}
      padding={"100px 0"}
      sx={{ border: "2px solid #ebebeb" }}
    >
      <img
        src={thankYouVector}
        style={{ margin: "20px auto" }}
        alt="thank-you-vector"
      />
      <Typography
        variant="h1"
        fontSize={"16px"}
        fontWeight={600}
        margin={"0 auto 20px auto"}
      >
        All set. Thank you for completing the offboarding!
      </Typography>
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        width={"70%"}
        margin={"20px auto"}
        // textAlign={'ce'}
      >
        Note that your responses will only be sent to the HR admin, and not your
        manager.
      </Typography>
      {/* <HRMButton
        mode={"secondaryA"}
        style={{
          padding: "10px",
          width: "132px",
          height: "32px",
          margin: "0 20px 20px auto",
        }}
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        Back
      </HRMButton> */}
      <HRMButton
        mode={"primary"}
        style={{
          padding: "10px",
          width: "218px",
          height: "32px",
          margin: "0 auto 20px auto",
        }}
        onClick={handleSubmit}
      >
        Complete and notify the HR
      </HRMButton>
    </Box>
  );
}

export default FinalStep;
