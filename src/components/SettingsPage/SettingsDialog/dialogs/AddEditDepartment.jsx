import { TextLabel, TextField } from "../styles";

const fieldName = "departmentName";

const validationRules = {
  required: "Department name is required.",
  minLength: {
    value: 2,
    message: "Department name must be at least 2 characters.",
  },
};

export const AddEditDepartment = ({ form, action }) => {
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
