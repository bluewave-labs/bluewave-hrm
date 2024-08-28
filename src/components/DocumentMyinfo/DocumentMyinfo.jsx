import React, {
  useEffect,
  useState,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import Box from "@mui/material/Box";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Typography, Stack } from "@mui/material";
import Link from "@mui/material/Link";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { multiStepContext } from "../../context/stepContext";

const DocumentMyinfo = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      handleSubmit: handleUpload,
    };
  });
  const fileInputRef = React.createRef();
  const [progress, setProgress] = useState(0);
  // const [dragOver, setDragOver] = useState(false);
  const [currentfile, setCurrentFile] = useState("");
  const [filesize, setFileSize] = useState(0);
  const [filelist, setFileList] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const { finalData, setFinalData } = useContext(multiStepContext);
  useEffect(() => {
    console.log("Files>>>", JSON.parse(localStorage.getItem("files")));
  }, [finalData, filelist]);

  const handleUpload = async () => {
    if (uploaded) {
      clearFileInput();
      return;
    }
    try {
      const uploadFiles = JSON.parse(localStorage.getItem("files"));
      for (let i = 0; i < uploadFiles.length; i++) {
        const uploadFile = uploadFiles[i];
        setUploaded(true);
        const response = await axios.post(
          "http://localhost:5000/api/documents",
          JSON.stringify(uploadFile),
          {
            headers: {
              "Content-Type": "application/json",
            },
            onUploadProgress: async (progressEvent) => {
              setCurrentFile(uploadFile.documentName);
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
              await delay(1500);
              setUploaded(false);
            },
          }
        );
        console.log(response);
      }
    } catch (error) {
      setUploaded(false);
      console.log(error);
    }
  };
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const uploadLocalStorage = (newFile) => {
    if (localStorage.getItem("files") == null) {
      const newArr = [];
      localStorage.setItem("files", JSON.stringify(newArr));
    }
    // upload to local storage
    let tempFiles = JSON.parse(localStorage.getItem("files"));
    tempFiles.push(newFile);
    localStorage.setItem("files", JSON.stringify(tempFiles));
  };

  // Add uploaded file to an Array
  const addFile = async (newFile) => {
    await setFileList((prevFiles) => [...prevFiles, newFile]);
    await setFinalData({
      ...finalData,
      filelist: [...finalData["filelist"], newFile],
    });
    uploadLocalStorage(newFile);
  };

  const handleDelete = (index) => {
    const newFilelist = finalData["filelist"].filter((_, i) => i !== index);
    // Update the state with the new array
    setFileList(newFilelist);
    setFinalData({ ...finalData, filelist: newFilelist });
    localStorage.setItem("files", JSON.stringify(newFilelist));
  };

  const formatDate = (inputDate) => {
    const [month, day, year] = inputDate.split("/").map(Number);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedMonth = monthNames[month - 1];
    return `${formattedMonth} ${day}, ${year}`;
  };

  // Handle file change event
  const handleFileChange = async (e) => {
    const file = await e.target.files[0];
    if (file) {
      const name = file.name.split(".")[0];
      const documentExtension = file.name.split(".")[1];
      const size = (file.size / 1000000).toFixed(1);
      const date = new Date();
      const newdate = date.toLocaleDateString();
      const uploadedDate = formatDate(newdate);
      // setCurrentFile(file.name.split(".")[0]);
      setFileSize(size);

      var reader = new FileReader();
      reader.onload = async function (event) {
        const base64String = await event.target.result.split(",")[1]; // Extract base64 string
        const uploadFile = {
          empId: finalData.empId,
          documentName: name,
          documentExtension,
          documentCategory: "offboarding",
          dateUploaded: uploadedDate,
          documentDescription: "this is a test file",
          documentFile: base64String,
        };
        addFile(uploadFile);
        // handleUpload(uploadFile);
      };
      reader.readAsDataURL(file);
    }
    // handleUpload();
  };

  // Trigger file input
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    // setDragOver(true);
  };
  // const handleDragLeave = () => {
  //   setDragOver(false);
  // };

  const handleDrop = (e) => {
    e.preventDefault();
    // setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInputRef.current.files = files;
      handleFileChange({ target: { files } });
    }
  };

  // Function to clear file state
  const clearFileInput = () => {
    fileInputRef.current.value = "";
    setProgress(0);
  };

  // Function to handle file upload

  return (
    <>
      <div
        onDragOver={handleDragOver}
        // onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Box
          height={126}
          width={812}
          my={4}
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          boxShadow={4}
          gap={4}
          p={2}
          sx={{ border: "2px solid #7F56D9", borderRadius: "12px" }}
        >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ height: "100vh" }}
          >
            <CloudUploadOutlinedIcon
              sx={{ border: "1px solid #EAECF0", borderRadius: "8px" }}
            />
            <Stack direction="row">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden-input"
                onChange={handleFileChange}
                hidden
              />
              <Link
                onClick={handleClick}
                type="file"
                component="button"
                underline="none"
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#6941C6",
                  fontFamily: "Inter",
                  marginBottom: "4px",
                  marginRight: "2px",
                }}
              >
                Click to upload
              </Link>

              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "regular",
                  color: "#475467",
                  fontFamily: "Inter",
                  marginBottom: "4px",
                }}
              >
                or drag and drop
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </div>

      {!uploaded ? (
        <></>
      ) : (
        <Box
          height={72}
          width={812}
          my={4}
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
          gap={4}
          p={2}
          sx={{
            border: "2px solid #EAECF0",
            borderRadius: "12px",
            background: `linear-gradient(to right, #F9FAFB ${progress}%, transparent ${progress}%), transparent 100%`,
          }}
        >
          <Stack>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "medium",
                color: "#344054",
                fontFamily: "Inter",
                marginBottom: "4px",
              }}
            >
              {currentfile}
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "regular",
                color: "#475467",
                fontFamily: "Inter",
                marginBottom: "4px",
              }}
            >
              {filesize}MB – {progress}% uploaded
            </Typography>
          </Stack>
          <Stack sx={{ position: "relative" }}>
            <CircularProgress
              variant="determinate"
              sx={{
                color: "#F2F4F7",
              }}
              size={40}
              thickness={4}
              value={100}
            />
            <CircularProgress
              variant="determinate"
              disableShrink
              sx={{
                color: "#7F56D9",
                position: "absolute",
                left: 0,
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: "round",
                },
              }}
              value={progress}
              size={40}
              thickness={4}
            />
          </Stack>
        </Box>
      )}

      {finalData["filelist"].length === 0 ? (
        <></>
      ) : (
        <TableContainer>
          <Table sx={{ width: "812px" }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                <TableCell
                  sx={{
                    fontSize: "12px",
                    fontWeight: "medium",
                    color: "#475467",
                    fontFamily: "Inter",
                  }}
                >
                  File name
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "12px",
                    fontWeight: "medium",
                    color: "#475467",
                    fontFamily: "Inter",
                  }}
                  align="left"
                >
                  Date uploaded
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finalData["filelist"].map((file, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "medium",
                      color: "#101828",
                      fontFamily: "Inter",
                    }}
                  >
                    {file.documentName}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "13px",
                      fontWeight: "regular",
                      color: "#475467",
                      fontFamily: "Inter",
                    }}
                  >
                    {file.uploadedDate}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      display="flex"
                      justifyContent="right"
                    >
                      <Link
                        component="button"
                        underline="none"
                        onClick={() => handleDelete(index)}
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#475467",
                          fontFamily: "Inter",
                          marginBottom: "4px",
                          marginRight: "8px",
                        }}
                      >
                        Delete
                      </Link>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
});

export default DocumentMyinfo;

// https://www.youtube.com/watch?v=edR6Az7shv8
