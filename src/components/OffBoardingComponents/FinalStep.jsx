import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import HRMButton from "../Button/HRMButton";
import { multiStepContext } from "../../context/stepContext";
import thankYouVector from "../../Images/placeholder.svg";
import Swal from "sweetalert2";
import StateContext from "../../context/StateContext";
import api from "../../assets/FetchServices";

function FinalStep() {
  const { finalData } = useContext(multiStepContext);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const stateContext = useContext(StateContext);
  const handleAlert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7F56D9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        handleSubmit();
        setIsSubmitted(false);
      }
    });
  };

  const handleSubmit = async () => {
    const { answer1, answer2, answer3, answer4, answer5, SignedDocumentAck } =
      finalData;
    const empId = stateContext.state.user.empId;
    const data = {
      empId,
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      SignedDocumentAck,
      isCompleted: true,
    };
    const props = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await api.offboarding.submit(data, props);
    const emailData = response?.data;
    // console.log(response?.data);
    const emailReq = await api.offboarding.sendEmail(emailData, props, empId);
    // console.log(emailReq);
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
        onClick={handleAlert}
        enabled={isSubmitted}
      >
        Complete and notify the HR
      </HRMButton>
    </Box>
  );
}

export default FinalStep;
