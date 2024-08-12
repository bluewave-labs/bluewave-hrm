import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
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

const TextField = styled(MUITextField)({
  "& fieldset": {
    borderColor: "1px solid #D0D5DD",
  },
  "& .MuiInputAdornment-root + input": {
    borderLeft: "1px solid #D0D5DD",
    paddingLeft: "4px",
  },
});

const Text = styled(Typography)({
  fontSize: "13px",
  fontWeight: "600",
  lineHeight: "20px",
  color: " #344054",
});

const parseDefaultValues = (company) => ({
  companyName: company?.companyName || "",
  companyWebsite: company?.companyWebsite || "",
  companyDomain: company?.companyDomain || "",
  administratorEmail: company?.administratorEmail || "",
  companyLogo: company?.companyLogo || "",
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

export default function Form({ company, style }) {
  const [countries, setCountries] = useState([]);
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: parseDefaultValues(company),
  });

  const [countryValue, setCountryValue] = useState(parseDefaultValues(company).country);

  // Load countries
  useEffect(() => {
    // Fetch countries from the REST API
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countryOptions = response.data.map(
          (country) => country.name.common
        );

        // Sort the countries alphabetically by name
        countryOptions.sort((a, b) => a.localeCompare(b));

        setCountries(countryOptions);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // Reset form when company changes
  useEffect(() => {
    const defaultValues = parseDefaultValues(company);
    reset(defaultValues);
    setCountryValue(defaultValues.country); // Update country value
  }, [company]);

  const onSubmit = (data) => {
    axios
      .put("http://localhost:3000/api/company", {...data, id: company.id})
      .then((response) => {
        console.log('Data submitted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
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
          <Grid xs={10} textAlign="center">
            <h3>Edit company profile information</h3>
          </Grid>
          {/*Textfield for company name*/}
          <Grid xs={3}>
            <Text>Company name</Text>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={{ ...register("companyName") }}
              color="secondary"
            />
          </Grid>
          {/*Textfield for company website*/}
          <Grid xs={3}>
            <Text>Company website</Text>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">https://</InputAdornment>
                ),
                ...register("companyWebsite"),
              }}
              size="small"
              color="secondary"
            />
          </Grid>
          {/*Textfield for company domain*/}
          <Grid xs={3}>
            <Text>Company domain</Text>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              inputProps={{
                ...register("companyDomain"),
              }}
              size="small"
              color="secondary"
            />
          </Grid>
          {/*Textfield for administrator email*/}
          <Grid xs={3}>
            <Text>Administrator email</Text>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              inputProps={{
                ...register("administratorEmail"),
              }}
              size="small"
              color="secondary"
            />
          </Grid>
          {/*Section for uploading company logo*/}
          <Grid xs={3}>
            <Text>Company logo</Text>
          </Grid>
          <Grid xs={7} sx={{ display: "flex" }}>
            <AddPhotoAlternateOutlinedIcon
              sx={{
                backgroundColor: "#F2F4F7",
                width: 35,
                height: 35,
                padding: 2,
                marginRight: 2,
                borderRadius: "50%",
              }}
            />
            <UploadFile inputProps={{ ...register("companyLogo") }} />
          </Grid>
          {/*Textfield for address line 1*/}
          <Grid xs={3}>
            <Text>Address line 1</Text>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={{ ...register("streetAddress") }}
              color="secondary"
            />
          </Grid>
          {/*Textfield for address line 2*/}
          <Grid xs={3}>
            <Text>Address line 2</Text>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={{ ...register("unitSuite") }}
              color="secondary"
            />
          </Grid>
          {/*Textfield for city*/}
          <Grid xs={3}>
            <Text>City</Text>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={{ ...register("city") }}
              color="secondary"
            />
          </Grid>
          {/*Textfield for State (if applicable)*/}
          <Grid xs={3}>
            <Text>State (if applicable)</Text>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={{ ...register("stateProvince") }}
              color="secondary"
            />
          </Grid>
          {/*Textfield for Postal code*/}
          <Grid xs={3}>
            <Text>Postal code</Text>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={{ ...register("postalZipCode") }}
              color="secondary"
            />
          </Grid>
          {/*Textfield for Country*/}
          <Grid xs={3}>
            <Text>Country</Text>
          </Grid>
          <Grid xs={7} alignContent="center">
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
          <Grid xs={3}>
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
        <Grid xs={10} alignContent="right" spacing={2}>
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
      </Box>
    </form>
  );
}

//Control panel settings for storybook
Form.propTypes = {};

//Default values for this component
Form.defaultProps = {
  style: {},
};
