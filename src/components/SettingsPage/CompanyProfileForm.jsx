import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
import { Buffer } from "buffer";
import {
  styled,
  TextField as MUITextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import UploadFile from "./UploadFile";
import HRMButton from "../Button/HRMButton";
import "./settings.css";
import axios from "axios";
import Toast from "./Toast";
import { useSettingsContext } from "./context";

const TextField = styled(MUITextField)({
  "& fieldset": {
    borderColor: "1px solid #D0D5DD",
  },
  "& .MuiInputAdornment-root + input": {
    borderLeft: "1px solid #D0D5DD",
    paddingLeft: "4px",
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

const Text = styled(Typography)({
  fontSize: "13px",
  fontWeight: "600",
  lineHeight: "20px",
  color: " #344054",
});

const convertImage = (logo) => {
  if (logo) {
    return Buffer.from(logo);
  }
  return "";
};

const parseDefaultValues = (company) => ({
  companyName: company?.companyName || "",
  companyWebsite: company?.companyWebsite || "",
  companyDomain: company?.companyDomain || "",
  administratorEmail: company?.administratorEmail || "",
  companyLogo: convertImage(company.companyLogo) || "",
  city: company?.city || "",
  streetAddress: company?.streetAddress || "",
  unitSuite: company?.unitSuite || "",
  stateProvince: company?.stateProvince || "",
  postalZipCode: company?.postalZipCode || "",
  country: company?.country || "",
  twitterUrl: company?.twitterUrl || "",
  facebookUrl: company?.facebookUrl || "",
  linkedinUrl: company?.linkedinUrl || "",
});

export default function CompanyProfileForm({ style }) {
  const { company } = useSettingsContext();
  const [countries, setCountries] = useState([]);
  const [companyLogo, setCompanyLogo] = useState(
    parseDefaultValues(company).companyLogo
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: parseDefaultValues(company),
  });
  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const [countryValue, setCountryValue] = useState(
    parseDefaultValues(company).country
  );

  const handleLogoUpload = (file) => {
    setCompanyLogo(file);

    setValue("companyLogo", file);
  };

  const handleClose = () => {
    setToast({ ...toast, open: false });
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countryOptions = response.data.map(
          (country) => country.name.common
        );

        countryOptions.sort((a, b) => a.localeCompare(b));

        setCountries(countryOptions);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    const defaultValues = parseDefaultValues(company);
    reset(defaultValues);
    setCountryValue(defaultValues.country);
  }, [company]);

  const onSubmit = (data) => {
    axios
      .put("http://localhost:3000/api/company", { ...data, id: company.id })
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        const updatedCompany = response.data.message;
        console.log("Updated company:", updatedCompany);
        reset(parseDefaultValues(updatedCompany));
        setCountryValue(updatedCompany.country);
        setToast({
          open: true,
          severity: "success",
          message: "Company profile updated successfully",
        });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        setToast({
          open: true,
          severity: "error",
          message: "Company profile updated failed. Please try again",
        });
      });
  };

  return (
    <form>
      <Box
        sx={{
          ...{
            paddingTop: 4,
            paddingBottom: 16,
            fontFamily: "Inter, sans-serif",
          },
          ...style,
        }}
      >
        <Grid container columns={10} rowSpacing={4} columnSpacing={1}>
          <Grid item xs={10} textAlign="center">
            <h3>Edit company profile information</h3>
          </Grid>
          {/*Textfield for company name*/}
          <Grid item xs={3}>
            <Text>Company name</Text>
          </Grid>
          <Grid item xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={{
                ...register("companyName", { required: true, minLength: 2 }),
              }}
              error={!!errors.companyName}
              helperText={errors.companyName ? "Company name is required." : ""}
              FormHelperTextProps={{
                className: errors.companyName ? "error" : "",
              }}
              color="secondary"
            />
          </Grid>
          {/*Textfield for company website*/}
          <Grid item xs={3}>
            <Text>Company website</Text>
          </Grid>
          <Grid item xs={7} alignContent="center">
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">https://</InputAdornment>
                ),
                ...register("companyWebsite", {
                  required: true,
                  pattern:
                    /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
                }),
              }}
              error={!!errors.companyWebsite}
              helperText={errors.companyWebsite ? "Invalid URL format." : ""}
              size="small"
              color="secondary"
            />
          </Grid>
          {/*Textfield for company domain*/}
          <Grid item xs={3}>
            <Text>Company domain</Text>
          </Grid>
          <Grid item xs={7} alignContent="center">
            <TextField
              fullWidth
              inputProps={{
                ...register("companyDomain", { required: true, minLength: 2 }),
              }}
              error={!!errors.companyDomain}
              helperText={
                errors.companyDomain ? "Company domain is required." : ""
              }
              size="small"
              color="secondary"
            />
          </Grid>
          {/*Textfield for administrator email*/}
          <Grid item xs={3}>
            <Text>Administrator email</Text>
          </Grid>
          <Grid item xs={7} alignContent="center">
            <TextField
              fullWidth
              inputProps={{
                ...register("administratorEmail", {
                  required: true,
                  pattern:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                }),
              }}
              error={!!errors.administratorEmail}
              helperText={
                errors.administratorEmail ? "Invalid email address." : ""
              }
              size="small"
              color="secondary"
            />
          </Grid>
          {/*Section for uploading company logo*/}
          <Grid item xs={3}>
            <Text>Company logo</Text>
          </Grid>
          <Grid item xs={7} sx={{ display: "flex" }}>
            {companyLogo ? (
              <img
                src={companyLogo}
                style={{
                  width: "200px",
                  height: "200px",
                  marginRight: "50px",
                }}
              />
            ) : (
              <AddPhotoAlternateOutlinedIcon
                sx={{
                  backgroundColor: "#F2F4F7",
                  width: "32px",
                  height: "32px",
                  padding: "32px",
                  marginRight: "50px",
                  borderRadius: "50%",
                }}
              />
            )}
            <UploadFile setFile={handleLogoUpload} />
          </Grid>
          {/*Textfield for address line 1*/}
          <Grid item xs={3}>
            <Text>Address line 1</Text>
          </Grid>
          <Grid item xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={{
                ...register("streetAddress", { required: true, minLength: 10 }),
              }}
              error={!!errors.streetAddress}
              helperText={errors.streetAddress ? "Address is required." : ""}
              color="secondary"
            />
          </Grid>
          {/*Textfield for address line 2*/}
          <Grid item xs={3}>
            <Text>Address line 2</Text>
          </Grid>
          <Grid item xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={{ ...register("unitSuite") }}
              color="secondary"
            />
          </Grid>
          {/*Textfield for city*/}
          <Grid item xs={3}>
            <Text>City</Text>
          </Grid>
          <Grid item xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={{
                ...register("city", { required: true, minLength: 2 }),
              }}
              error={!!errors.city}
              helperText={errors.city ? "City is required." : ""}
              color="secondary"
            />
          </Grid>
          {/*Textfield for State (if applicable)*/}
          <Grid item xs={3}>
            <Text>State (if applicable)</Text>
          </Grid>
          <Grid item xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={{
                ...register("stateProvince"),
              }}
              color="secondary"
            />
          </Grid>
          {/*Textfield for Postal code*/}
          <Grid item xs={3}>
            <Text>Postal code</Text>
          </Grid>
          <Grid item xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={{
                ...register("postalZipCode", { required: true, minLength: 4 }),
              }}
              error={!!errors.postalZipCode}
              helperText={
                errors.postalZipCode ? "Postal Code is required." : ""
              }
              color="secondary"
            />
          </Grid>
          {/*Textfield for Country*/}
          <Grid item xs={3}>
            <Text>Country</Text>
          </Grid>
          <Grid item xs={7} alignContent="center">
            <Autocomplete
              disablePortal
              options={countries}
              renderInput={(params) => <TextField {...params} />}
              value={countryValue}
              onChange={(_, value) => {
                setCountryValue(value);
                setValue("country", value);
              }}
              fullWidth
              size="small"
              color="secondary"
              inputProps={{ ...register("country") }}
            />
          </Grid>
          {/*Textfield for Social profiles*/}
          <Grid item xs={3}>
            <Text>Social profiles</Text>
          </Grid>
          <Grid container xs={7} alignContent="center" spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      twitter.com/
                    </InputAdornment>
                  ),
                  ...register("twitterUrl"),
                }}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      facebook.com/
                    </InputAdornment>
                  ),
                  ...register("facebookUrl"),
                }}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      linkedin.com/company/
                    </InputAdornment>
                  ),
                  ...register("linkedinUrl"),
                }}
                color="secondary"
              />
            </Grid>
          </Grid>
        </Grid>
        {/*Add company button*/}
        <Grid item xs={10} alignContent="right" spacing={2}>
          <HRMButton
            mode="primary"
            style={{
              float: "right",
              marginTop: "60px",
            }}
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            Save changes
          </HRMButton>
          {/* <input type="submit" /> */}
        </Grid>
        <Grid item xs={10} alignContent="right" spacing={2}>
          <Toast
            open={toast.open}
            severity={toast.severity}
            message={toast.message}
            onClose={handleClose}
          />
        </Grid>
      </Box>
    </form>
  );
}

//Control panel settings for storybook
CompanyProfileForm.propTypes = {};

//Default values for this component
CompanyProfileForm.defaultProps = {
  style: {},
};
