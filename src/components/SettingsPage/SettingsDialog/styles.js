import {
  styled,
  TextField as MUITextField,
  Typography,
  Dialog as MUIDialog,
  DialogTitle as MUIDialogTitle,
} from "@mui/material";

export const Dialog = styled(MUIDialog)({
  "& .MuiDialog-paper": {
    width: "500px",
    borderRadius: "10px",
  },
});

export const DialogTitle = styled(MUIDialogTitle)({
  fontSize: "16px",
  fontWeight: "600",
  color: "#344054",
});

export const TextField = styled(MUITextField)({
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    padding: "4px 10px",
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#FDA29B",
    },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#D92D20",
    fontSize: "11px",
    fontWeight: 400,
    marginLeft: 0,
    lineHeight: "24px",
    textAlign: "left",
  },
});

export const TextLabel = styled(Typography)({
  fontSize: "13px",
  fontWeight: "400",
  marginBottom: "10px",
  color: "#000000",
});
