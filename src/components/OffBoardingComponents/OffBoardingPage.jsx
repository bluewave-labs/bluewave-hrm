import React, { useContext, useEffect } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import { multiStepContext } from "../../context/stepContext";
import FinalStep from "./FinalStep";
import { Box } from "@mui/system";
import CustomizedSteppers from "../SetupCompanyMenu/CustomizedSteppers";
import StateContext from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
const api = require("../../assets/FetchServices");

function OffBoardingPage() {
  const { currentStep, finalData } = useContext(multiStepContext);
  const stateContext = useContext(StateContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        if (!stateContext.state.user) {
          const currentUser = await api.user.refresh();

          if (currentUser) {
            // Get associated employee record
            const currentEmployee = await api.employee.fetchOneByEmail(
              currentUser.email
            );

            const data = {
              user: currentUser,
              employee: currentEmployee,
            };
            //Set logo =
            try {
              const res = await api.company.fetchLogo();
              const logo = `data:image/png;base64,${atob(res)}`;
              if (logo) {
                data["logo"] = logo;
              }
            } catch (error) {
              console.log("Error, failed to reload logo");
            }
            // console.log({ data });
            stateContext.updateStates(data);
          } else {
            throw "No active session, please log in.";
          }
        }
      } catch (err) {
        console.log(err);
        navigate("/", { replace: true }); // Redirect to login page
      }
    }
    fetchData();
    // console.log({ stateContext });
  }, []);

  const stepStyle = {
    "&.MuiStepper-root": {
      padding: "50px 50px",
    },
    "& .MuiStepConnector-line": {
      marginTop: "-15px",
      width: "100%",
    },
    "& .Mui-active": {
      "&.MuiStepIcon-root": {
        color: "#7F56D9",
      },
      "& .MuiStepConnector-line": {
        border: "1px solid #7f56d9",
      },
      "& .MuiSvgIcon-root": {
        fontSize: "30px",
      },
    },
    "& .Mui-completed": {
      "&.MuiStepIcon-root": {
        color: "#7F56D9",
      },
      "& .MuiStepConnector-line": {
        border: "1px solid #7f56d9",
      },
      "& .MuiSvgIcon-root": {
        fontSize: "30px",
      },
    },
    "& .MuiStepLabel-root": {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      "& .MuiStepLabel-label": {
        marginTop: "10px",
      },
    },
  };
  function showstep(step) {
    switch (step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      case 4:
        return <FinalStep />;
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
