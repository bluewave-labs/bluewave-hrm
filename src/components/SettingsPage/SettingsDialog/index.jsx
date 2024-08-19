import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/system";
import { DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HRMButton from "../../Button/HRMButton";
import { dialogTitle, dialogContent } from "./constants";
import { Dialog, DialogTitle } from "./styles";
import { useDepartmentData } from "./useDepartmentData";
export { tabNames } from "./constants";

export default function CustomDialog({
  open,
  onClose,
  action,
  tabName,
  selectedItem,
}) {
  const form = useForm();
  const departmentData = useDepartmentData();
  console.log("selectedItem", selectedItem);

  const Content = useMemo(() => {
    if (!action || !tabName) return null;
    return dialogContent[action][tabName];
  }, [action, tabName]);

  useEffect(() => {
    form.reset();
  }, [open]);

  const onSubmit = (data) => {
    return departmentData[action](selectedItem, data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between">
        <DialogTitle>{dialogTitle?.[action]?.[tabName]}</DialogTitle>
        <CloseIcon
          onClick={onClose}
          sx={{
            width: "20px",
            height: "20px",
            backgroundColor: "#FFFFFFF",
            color: "#98A2B3",
            textAlign: "right",
            padding: "16px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      </Stack>
      <DialogContent>
        <Content form={form} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
          sx={{ marginTop: "50px" }}
        >
          <HRMButton mode="secondaryB" onClick={onClose} color="primary">
            Cancel
          </HRMButton>
          <HRMButton mode="primary" onClick={form.handleSubmit(onSubmit)}>
            Save
          </HRMButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
