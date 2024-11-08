import Stack from "@mui/system/Stack";
import HRMButton from "../Button/HRMButton";
import MyInfoPersonCard from "./MyInfoPersonalCard";
//import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { Box, ThemeProvider, Typography, createTheme  } from "@mui/material";
import StateContext from "../../context/StateContext";

const theme = createTheme({
  typography: {

    bodybutton: {
      fontWeight: 400,
      fontFamily:'Inter',
      fontSize: '13px',
      color: '#FFF',
    },
   
  },
});

export default function MyInfoMain({style, onClickEdit}) {
  const {state} = useContext(StateContext);
  const employee = state.employee;

  if (!employee) {
    return <div style={{paddingTop:"0px"}}>No record to display.</div>;
  }
  return (
    <ThemeProvider theme={theme}>
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
          {employee.firstName} {employee.lastName}
        </h2>
        <HRMButton
          onClick={()=>{
            console.log("called");
            if(onClickEdit){
              onClickEdit(true);
            }
          }}
          mode={"primary"}
          style={{ borderRadius: "8px", width: "60.0px", height: "34.0px",}}
        >
          <Typography variant='bodybutton'>Edit</Typography>
        </HRMButton>
      </Stack>
      <MyInfoPersonCard key={employee.empId} employee={employee} />
    </Box>
    </ThemeProvider>
  );
}

MyInfoMain.propTypes = {};
