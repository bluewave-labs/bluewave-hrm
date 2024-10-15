import React from "react";
import ErrorPage from "../components/Error/ErrorPage";
import StateContext from "../context/StateContext";

// Temporary imports
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

// This is a placeholder component. The function is to be replaced with the actual onboarding components.
const Placeholder = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard", { replace: true });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1>Employee onboarding page goes here...</h1>
      <p>This is a placeholder page.</p>
      <Button
        onClick={handleClick}
        sx={{
          width: "214px",
          height: "34px",
          border: "1px solid #7F56D9",
          backgroundColor: "#7F56D9",
          color: "#FFFFFF",
          fontSize: 13,
          fontWeight: 400,
          textTransform: "none",
          padding: "10px auto",
          boxShadow: "0px 1px 2px 0px #1018280D",
          margin: "45px 0px",
          "&:hover": {
            backgroundColor: "#602ece",
            border: "1px solid #602ece",
          },
        }}
      >
        Return to Dashboard
      </Button>
    </div>
  );
};

function EmployeeOnboarding() {
  const stateContext = React.useContext(StateContext);
  if (!stateContext.state.user) {
    // No active session
    return <ErrorPage />;
  } else if (!stateContext.state.employee) {
    // No employee record. This happens when admin does not have employee record.
    return <ErrorPage />;
  } else if (stateContext.state.employee.completedOnboardingAt) {
    // Employee has completed onboarding process
    return <ErrorPage />;
  } else {
    // Display employee onboarding page
    // Replace the Placeholder with actual onboarding components.
    return (
      <>
       {Placeholder()} 
      </>
    );
  }
}

export default EmployeeOnboarding;
