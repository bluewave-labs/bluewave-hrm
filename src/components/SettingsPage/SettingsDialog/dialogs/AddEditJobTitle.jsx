import { TextLabel, TextField } from "../styles";

const fieldName = "roleTitle";

const validationRules = {
  required: "Job title is required.",
  minLength: {
    value: 2,
    message: "Job title must be at least 2 characters.",
  },
};

export const AddEditJobTitle = ({ form, action }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <TextLabel>{action === "add" ? "Name" : "New name"}</TextLabel>
      <TextField
        size="small"
        fullWidth
        color="secondary"
        {...register(fieldName, validationRules)}
        error={!!errors[fieldName]}
        helperText={errors[fieldName]?.message || ""}
        FormHelperTextProps={{
          className: errors[fieldName] ? "error" : "",
        }}
      />
    </>
  );
};
