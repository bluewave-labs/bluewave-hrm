import Stack from "@mui/system/Stack";
//import HRMButton from "../Button/HRMButton";
//import MyInfoPersonCard from "./MyInfoPersonalCard";
//import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { Box } from "@mui/material";
import StateContext from "../../context/StateContext";
import SatisfactionSurveysCards from "./SatisfactionSurveysCards";

export default function SatisfactionSurveysMain({style, onClickEdit}) {
  const {state} = useContext(StateContext);
  const employee = state.employee;

  if (!employee) {
    return <div style={{paddingTop:"0px"}}>No record to display.</div>;
  }
  return (
    <Box>
      {/*Main page content*/}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
       
      >
        <h2
          style={{
            fontSize: "24px",
            fontFamily: "Inter",
            fontWeight: "600",
            color: "#101828",
            marginTop:"0px",
            marginBottom: "16px",
          }}
        >
          Satisfaction Surveys
        </h2>
       
      </Stack>
      <SatisfactionSurveysCards key={employee.empId} employee={employee} />
    </Box>
  );
}

SatisfactionSurveysMain.propTypes = {};
