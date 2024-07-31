import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, display } from "@mui/system";
import React, { useContext } from "react";
import HRMButton from "../Button/HRMButton";
import { multiStepContext } from "../../context/stepContext";
import DocumentMyinfo from "../DocumentMyinfo/DocumentMyinfo";
import uploadDocument from "../../Images/upload-document.svg";
import CheckBox from "../Checkbox/Checkbox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";

function SecondStep() {
  const { currentStep, setCurrentStep, finalData, setFinalData } =
    useContext(multiStepContext);
 
  return (
    <>
      <Box
        width={"1003px"}
        margin={"49px auto 0 auto"}
        textAlign={"center"}
        sx={{ border: "2px solid #ebebeb" }}
        padding={"44px 0"}
      >
        <Typography
          fontFamily="Inter"
          variant="h1"
          fontSize={"16px"}
          fontWeight={600}
          margin={"20px auto"}
        >
          1. Download documents below, sign them and upload again
        </Typography>
        <Typography
          fontFamily="Inter"
          fontSize={"13px"}
          fontWeight={400}
          margin={"0 auto 20px auto"}
        >
          You can sign digitally or manually by printing and scanning as you
          wish.
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
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
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
      </Box>
      <Box
        width={"1003px"}
        margin={"49px auto 0 auto"}
        textAlign={"center"}
        sx={{ border: "2px solid #ebebeb" }}
      >
        <Typography
          fontFamily="Inter"
          variant="h1"
          fontSize={"16px"}
          fontWeight={600}
          margin={"51px auto 48px auto"}
        >
          2. Sign the documents
        </Typography>
        <img
          src={uploadDocument}
          style={{ margin: "29px auto" }}
          alt="thank-you-vector"
        />
        <Typography
          fontFamily="Inter"
          fontSize={"11px"}
          fontWeight={400}
          margin={"0 auto 20px auto"}
        >
          You may sign them using Adobe Acrobat’s{" "}
          <a
            href="https://www.adobe.com/acrobat/online/sign-pdf.html"
            target="_blank"
          >
            online signing tool
          </a>
          .
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 0 51px 0",
          }}
        >
          <CheckBox
          name="SignedDocmentAck"
            checked={finalData["SignedDocmentAck"]}
            value={finalData["SignedDocmentAck"]}
            onChange={(e) => {
              setFinalData({ ...finalData, SignedDocmentAck: !finalData["SignedDocmentAck"] });
            }}
          />
          <Typography
            fontFamily="Inter"
            variant="h1"
            fontSize={"13px"}
            fontWeight={400}
            // sx={{display:"inline"}}
            margin={"0 5px"}
            lineHeight={"10px"}
          >
            I have signed the documents and am ready to proceed to the next step
          </Typography>
        </Box>
      </Box>
      <Box
        width={"1003px"}
        margin={"49px auto"}
        padding={"65px 0"}
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
          3. Upload signed documents
        </Typography>
        <Typography
          fontFamily="Inter"
          fontSize={"13px"}
          fontWeight={400}
          margin={"0 auto 20px auto"}
        >
          You can sign digitally or manually by printing and scanning as you
          wish.
        </Typography>
        {/* <FileUploadDialog/> */}
        <Box sx={{ width: "80%", margin: "20px auto" }}>
          <DocumentMyinfo />
        </Box>

        {/* table logic ends... */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "50px 0",
          }}
        >
          <HRMButton
            mode={"secondaryA"}
            style={{
              padding: "10px",
              width: "132px",
              height: "32px",

              fontSize: "13px",
            }}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            <ArrowBackIcon sx={{ padding: "2px" }}/>Previous
          </HRMButton>
          <HRMButton
            mode={"primary"}
            style={{
              padding: "10px",
              width: "132px",
              height: "32px",
              fontSize: "13px",
              
            }}
            onClick={() => setCurrentStep(3)}
            enabled={finalData['SignedDocmentAck']}
          >
            Save and next
          </HRMButton>
        </div>
      </Box>
    </>
  );
}

export default SecondStep;
