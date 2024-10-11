import React, { useState } from "react";

export const multiStepContext = React.createContext();

const StepContext = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [finalData, setFinalData] = useState({
    filelist: [],
    SignedDocumentAck: false,
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: "",
  });
  return (
    <>
      <multiStepContext.Provider
        value={{
          currentStep,
          setCurrentStep,

          finalData,
          setFinalData,
        }}
      >
        {children}
      </multiStepContext.Provider>
    </>
  );
};

export default StepContext;
