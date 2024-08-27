import React, { useState } from "react";
import App from "../App";

export const multiStepContext = React.createContext();

const StepContext = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState([]);
  const [finalData, setFinalData] = useState({
    filelist: [],
    empId: 2,
    SignedDocumentAck: false,
  });
  return (
    <>
      <multiStepContext.Provider
        value={{
          currentStep,
          setCurrentStep,
          userData,
          setUserData,
          finalData,
          setFinalData,
        }}
      >
        <App />
      </multiStepContext.Provider>
    </>
  );
};

export default StepContext;
