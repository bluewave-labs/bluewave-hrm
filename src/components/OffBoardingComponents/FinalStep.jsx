import {
  Backdrop,
  Button,
  CircularProgress,
  Grow,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import HRMButton from "../Button/HRMButton";
import { multiStepContext } from "../../context/stepContext";
import thankYouVector from "../../Images/placeholder.svg";
import StateContext from "../../context/StateContext";
import api from "../../assets/FetchServices";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";

function FinalStep() {
  const { finalData } = useContext(multiStepContext);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const stateContext = useContext(StateContext);

  const [open, setOpen] = React.useState(false);
  const [openToast, setOpenToast] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleOpenToast = () => setOpenToast(true);
  const handleClose = () => setOpen(false);
  const handleCloseToast = () => setOpenToast(false);

  const style = {
    container: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "486px",
      height: "237px",
      bgcolor: "#fff",
      boxShadow:
        "0px 8px 8px -4px #10182808;box-shadow:%200px%2020px%2024px%20-4px%20#10182814",
      borderRadius: "12px",
      p: "32px",
    },
    title: {
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "38px",
      textAlign: "left",
      color: "#344054",
    },
    description: {
      fontSize: "13px",
      fontWeight: "400",
      lineHeight: "28px",
      textAlign: "left",
      marginTop: "8px",
    },
    buttonContainer: {
      textAlign: "right",
      marginTop: "32px",
    },
    buttonCancel: {
      margin: "0 24px",
      width: "124px",
      height: "34px",
    },
    buttonConfirm: {
      width: "124px",
      height: "34px",
    },
    toastContainer: {
      position: "absolute",
      top: "24px",
      right: "8px",
      width: "570px",
      height: "52px",
      bgcolor: "#fff",
      boxShadow:
        "0px 8px 8px -4px #10182808;box-shadow:%200px%2020px%2024px%20-4px%20#10182814",
      borderRadius: "12px",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    toastTitle: {
      fontSize: "13px",
      lineHeight: "20px",
    },
    toastBox: {
      display: "flex",
      justifyContent: "space-between ",
      alignItems: "center",
    },
    toastClose: {
      color: "grey",
      display: "inline-block",
      padding: "0",
      minHeight: "0",
      minWidth: "0",
      margin: "8px 0 0 32px",
    },
  };

  const handleAlert = async () => {
    try {
      await handleSubmit();
      setIsSubmitted(false);
      handleClose();
      handleOpenToast();
      setTimeout(() => {
        handleCloseToast();
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    const { answer1, answer2, answer3, answer4, answer5, SignedDocumentAck } =
      finalData;
    const empId = stateContext.state.user.empId;
    const data = {
      empId,
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      SignedDocumentAck,
      isCompleted: true,
    };
    const props = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    const response = await api.offboarding.submit(data, props);
    const emailData = response?.data;
    // console.log(response?.data);
    const emailReq = await api.offboarding.sendEmail(emailData, props, empId);
    // console.log(emailReq);
    setLoading(false);
  };
  return (
    <Box
      width={"1003px"}
      margin={"0 auto"}
      textAlign={"center"}
      padding={"100px 0"}
      sx={{ border: "2px solid #ebebeb" }}
    >
      <img
        src={thankYouVector}
        style={{ margin: "20px auto" }}
        alt="thank-you-vector"
      />
      <Typography
        variant="h1"
        fontSize={"16px"}
        fontWeight={600}
        margin={"0 auto 20px auto"}
      >
        All set. Thank you for completing the offboarding!
      </Typography>
      <Typography
        fontSize={"13px"}
        fontWeight={400}
        width={"70%"}
        margin={"20px auto"}
      >
        Note that your responses will only be sent to the HR admin, and not your
        manager.
      </Typography>
      <HRMButton
        mode={"primary"}
        style={{
          padding: "10px",
          width: "218px",
          height: "32px",
          margin: "0 auto 20px auto",
        }}
        onClick={handleOpen}
        enabled={isSubmitted}
      >
        Complete and notify the HR
      </HRMButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.container}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={style.title}
          >
            Are you sure you want to send your responses?
          </Typography>
          <Typography id="modal-modal-description" sx={style.description}>
            When you confirm, all your responses will be ent to the HR
            administrator.
          </Typography>
          <Box sx={style.buttonContainer}>
            <HRMButton
              mode={"secondaryB"}
              style={style.buttonCancel}
              onClick={handleClose}
            >
              Cancel
            </HRMButton>
            <HRMButton
              mode={"primary"}
              style={style.buttonConfirm}
              onClick={handleAlert}
              startIcon={
                loading ? <CircularProgress color="inherit" size={16} /> : ""
              }
            >
              Confirm
            </HRMButton>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openToast}
        onClose={handleCloseToast}
        aria-labelledby="toast-modal-title"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Grow
          in={openToast}
          tyle={{ transformOrigin: "0 0 0" }}
          {...(openToast ? { timeout: 1000 } : {})}
        >
          <Box sx={style.toastContainer}>
            <Box sx={style.toastBox}>
              <Typography
                id="toast-modal-title"
                variant="h6"
                component="h2"
                sx={style.toastTitle}
              >
                Thank you for filling in the survey. Your response is sent to
                the HR administrator.
              </Typography>
              <Button sx={style.toastClose} onClick={handleCloseToast}>
                <CloseIcon />
              </Button>
            </Box>
          </Box>
        </Grow>
      </Modal>
    </Box>
  );
}

export default FinalStep;
