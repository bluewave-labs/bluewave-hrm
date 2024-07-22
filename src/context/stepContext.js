import React, { useState } from 'react'
import App from '../App'

export const multiStepContext = React.createContext();


const StepContext = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState([]);
    const [finalData, setFinalData] = useState([]);
    return (
        <>
        <multiStepContext.Provider value={{currentStep,setCurrentStep,userData,setUserData,finalData,setFinalData}}>
            <App/>
        </multiStepContext.Provider>
        </>
    )
}

export default StepContext;