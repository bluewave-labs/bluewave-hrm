import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import HRMButton from '../Button/HRMButton'
import { multiStepContext } from '../../context/stepContext'
import thankYouVector from '../../Images/thank-you-vector.svg';

function FinalStep() {
    const { currentStep,setCurrentStep } = useContext(multiStepContext);
    return (
      <Box
        width={"1003px"}
        margin={"0 auto"}
        textAlign={"center"}
        sx={{ border: "2px solid #ebebeb" }}
      >
        <img src={thankYouVector} style={{margin:'20px auto'}} alt='thank-you-vector'/>
        <Typography variant="h1" fontSize={"16px"} fontWeight={600} margin={"0 auto 20px auto"}>
        Thank you for completing the offboarding!
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
          style={{ padding: "10px", width: "218px", height: "32px", margin:'0 auto 20px auto' }}
          onClick={() => setCurrentStep(4)}
        >
          Complete and notify the HR
        </HRMButton>
      </Box>
    );
}

export default FinalStep
