import { useState, useEffect } from "react";
import { TextLabel, TextField } from "../styles";
import Stack from "@mui/system/Stack";
import { styled, Typography } from "@mui/material";
import HRMCheckbox from "../../../Checkbox/Checkbox";

const validationRules = {
  required: "Policy name is required.",
  minLength: {
    value: 2,
    message: "Policy name must be at least 2 characters.",
  },
};

export const Checkbox = styled(HRMCheckbox)({
  fontSize: "16px",
  fontWeight: "600",
  border: "2px solid #344054",
});

export const AddEditTimeOffPolicy = ({ form, action }) => {
  const [unlimited, setUnlimited] = useState(false);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const isUnlimitedChecked = watch("unlimitedBalance", unlimited);

  useEffect(() => {
    setValue("balance", unlimited ? "Unlimited" : "");
  }, [unlimited]);

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <>
      <TextLabel>Name</TextLabel>
      <TextField
        size="small"
        fullWidth
        color="secondary"
        {...register("policyName", validationRules)}
        error={!!errors["policyName"]}
        helperText={errors["policyName"]?.message || ""}
        FormHelperTextProps={{
          className: errors["policyName"] ? "error" : "",
        }}
      />
      <TextLabel sx={{ marginTop: "24px" }}>Default balance</TextLabel>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ marginTop: "12px" }}
      >
        <TextField
          size="small"
          fullWidth
          color="secondary"
          sx={{ width: "100px", color: unlimited && "#667085" }}
          disabled={unlimited}
          {...register("balance", {
            validate: (value) => {
              if (unlimited) return true;
              if (!unlimited && value.trim() === "")
                return "Balance is required.";
              return true;
            },
          })}
          error={!unlimited && !!errors["balance"]}
          FormHelperTextProps={{
            className: errors["balance"] ? "error" : "",
          }}
        />
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "24px",
          }}
        >
          days
        </Typography>
      </Stack>
      {!!errors["balance"] && !unlimited && (
        <Typography
          sx={{
            color: "#D92D20",
            fontSize: "11px",
            fontWeight: 400,
            fontFamily: "Inter",
            marginTop: "10px",
          }}
        >
          {errors["balance"]?.message}
        </Typography>
      )}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ marginTop: "12px" }}
      >
        <Checkbox
          type="checkbox"
          id="unlimitedBalance"
          name="unlimitedBalance"
          {...register("unlimitedBalance")}
          checked={isUnlimitedChecked}
          onChange={(e) => {
            setUnlimited(e.target.checked);
            setValue("unlimitedBalance", e.target.checked);
          }}
          size="large"
          sx={{ marginRight: "100px", borderColor: "red" }}
        />
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "24px",
          }}
        >
          Make unlimited
        </Typography>
      </Stack>
    </>
  );
};
