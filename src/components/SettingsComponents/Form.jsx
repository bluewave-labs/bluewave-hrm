import { useForm } from "react-hook-form";
import Stack from "@mui/system/Stack";
import { FormControl, TextField } from "@mui/material";
import HRMButton from "../Button/HRMButton";
import "./settings.css";

export default function Form() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: "25px" }}
        >
          <label>Company name</label>
          <TextField
            name="companyName"
            inputProps={register}
            color="secondary"
          />
        </Stack>
      </FormControl>
      <FormControl>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: "25px" }}
        >
          <label>Company website</label>
          <TextField
            name="companyName"
            inputProps={register}
            color="secondary"
          />
        </Stack>
      </FormControl>
      <Stack direction="row" alignItems="center">
        <HRMButton mode="primary">Save changes</HRMButton>
      </Stack>
    </form>
  );
}
