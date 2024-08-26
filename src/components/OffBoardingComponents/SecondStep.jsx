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
import React, { useContext, useEffect, useState } from "react";
import HRMButton from "../Button/HRMButton";
import { multiStepContext } from "../../context/stepContext";
import DocumentMyinfo from "../DocumentMyinfo/DocumentMyinfo";

import CheckBox from "../Checkbox/Checkbox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import arrow from "../../Images/Arrow.svg";
import axios from "axios";
import { useRef } from "react";

function SecondStep() {
  const { currentStep, setCurrentStep, finalData, setFinalData } =
    useContext(multiStepContext);

  const [leavingLetter, setLeavingLetter] = useState("");
  const [nda, setNda] = useState("");
  const docRef = useRef();

  useEffect(() => {
    try {
      fetchDocuments();
    } catch (err) {
      console.log(err);
    }
  });

  const handleCheckBox = (e) =>
    setFinalData({
      ...finalData,
      SignedDocumentAck: e.target.checked,
    });
  const fetchDocuments = () => {
    axios.get(`http://localhost:5000/api/documents/lldoc`).then((blob) => {
      // console.log(blob.data);
      setLeavingLetter(blob.data);
    });
    axios.get(`http://localhost:5000/api/documents/nda`).then((blob) => {
      // console.log(blob.data);
      setNda(blob.data);
    });
  };
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handleNext = async () => {
    await docRef.current.handleSubmit();
    await delay(3000);
    setCurrentStep(3);
  };
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
          Download documents below, sign them and upload again
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
                  <a
                    href={`data:application/pdf;base64,${leavingLetter}`}
                    download={"leavingLetter.pdf"}
                    target="_blank"
                  >
                    Download
                  </a>
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
                  <a
                    href={`data:application/pdf;base64,${nda}`}
                    download={"NDA.pdf"}
                    target="_blank"
                  >
                    Download
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "26px 0",
        }}
      >
        <img src={arrow} alt="arrow-icon" width={50} height={50} />
      </Box>

      <Box
        width={"1003px"}
        margin={"0 auto 49px auto"}
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
          Upload signed documents
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
          <DocumentMyinfo ref={docRef} />
        </Box>

        {/* table logic ends... */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            width: "80%",
            margin: "54px auto",
          }}
        >
          <CheckBox
            checked={false || finalData?.SignedDocumentAck}
            onChange={handleCheckBox}
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "50px 0",
          }}
        >
          <HRMButton
            mode={"secondaryA"}
            startIcon={<ArrowBackIcon />}
            style={{
              padding: "10px",
              width: "132px",
              height: "32px",

              fontSize: "13px",
            }}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </HRMButton>
          <HRMButton
            mode={"primary"}
            style={{
              padding: "10px",
              width: "132px",
              height: "32px",
              fontSize: "13px",
            }}
            onClick={handleNext}
            enabled={finalData["SignedDocumentAck"]}
          >
            Save and next
          </HRMButton>
        </div>
      </Box>
    </>
  );
}

export default SecondStep;
