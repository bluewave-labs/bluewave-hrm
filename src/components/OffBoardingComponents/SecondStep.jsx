import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import HRMButton from "../Button/HRMButton";
import { multiStepContext } from "../../context/stepContext";
import DocumentMyinfo from "../DocumentMyinfo/DocumentMyinfo";

function SecondStep() {
  const { currentStep, setCurrentStep } = useContext(multiStepContext);
  return (
    <Box
      width={"1003px"}
      margin={"0 auto"}
      textAlign={"center"}
      sx={{ border: "2px solid #ebebeb" }}
    >
      <Typography
        fontFamily="Inter"
        variant="h1"
        fontSize={"16px"}
        fontWeight={600}
        margin={"20px auto"}
      >
        Download documents below, sign them and upload again
      </Typography>
      <Typography
        fontFamily="Inter"
        fontSize={"13px"}
        fontWeight={400}
        margin={"0 auto 20px auto"}
      >
        You can sign digitally or manually by printing and scanning as you wish.
      </Typography>
      {/* Logic for upload documents */}

      <TableContainer
        // component={Paper}
        sx={{ width: "80%", margin: "20px auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#F9FAFB",
                  width: "100%",
                  fontFamily: "Inter",
                  fontWeight: "500",
                }}
              >
                File name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#F9FAFB",
                  width: "100%",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ fontFamily: "Inter", fontWeight: "600", fontSize:"14px"}}
              >
                Leaving Letter
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "600",
                  color: "#7F56D9",
                  
                }}
              >
                Download
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ fontFamily: "Inter", fontWeight: "600" }}
              >
                NDA
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "600",
                  color: "#7F56D9",
                }}
              >
                Download
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* <FileUploadDialog/> */}
      <Box sx={{ width: "80%", margin: "20px auto" }}>
        <DocumentMyinfo />
      </Box>

      {/* table logic ends... */}
      <HRMButton
        mode={"primary"}
        style={{
          padding: "0px var(--spacing-xxs) 0px var(--spacing-xxs)",
          fontSize: "13px",
          width: "132px",
          height: "32px",
          margin: "0 auto 20px auto",
        }}
        onClick={() => setCurrentStep(3)}
      >
        Save and next
      </HRMButton>
    </Box>
  );
}

export default SecondStep;
