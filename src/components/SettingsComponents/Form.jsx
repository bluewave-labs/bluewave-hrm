import { useForm } from "react-hook-form";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import UploadFile from "./UploadFile";
import HRMButton from "../Button/HRMButton";
import "./settings.css";

export default function Form({ style }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Grid container columns={10} rowSpacing={2} columnSpacing={1}>
          <Grid xs={10} textAlign="center">
            <h3>Edit company profile information</h3>
          </Grid>
          {/*Textfield for company name*/}
          <Grid xs={3}>
            <h5>Company name</h5>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={register("name")}
              color="secondary"
            />
          </Grid>
          {/*Textfield for company website*/}
          <Grid xs={3}>
            <h5>Company website</h5>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">https://</InputAdornment>
                ),
              }}
              size="small"
              inputProps={register("website")}
              color="secondary"
            />
          </Grid>
          {/*Section for uploading company logo*/}
          <Grid xs={3}>
            <h5>Company logo</h5>
          </Grid>
          <Grid xs={7} sx={{ display: "flex", justifyContent: "center" }}>
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
            <UploadFile inputProps={register("logo")} />
          </Grid>
          {/*Textfield for address line 1*/}
          <Grid xs={3}>
            <h5>Address line 1</h5>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={register("address1")}
              color="secondary"
            />
          </Grid>
          {/*Textfield for address line 2*/}
          <Grid xs={3}>
            <h5>Address line 2</h5>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={register("address2")}
              color="secondary"
            />
          </Grid>
          {/*Textfield for city*/}
          <Grid xs={3}>
            <h5>City</h5>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={register("city")}
              color="secondary"
            />
          </Grid>
          {/*Textfield for State (if applicable)*/}
          <Grid xs={3}>
            <h5>State (if applicable)</h5>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={register("state")}
              color="secondary"
            />
          </Grid>
          {/*Textfield for Postal code*/}
          <Grid xs={3}>
            <h5>Postal code</h5>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={register("postalcode")}
              color="secondary"
            />
          </Grid>
          {/*Textfield for Country*/}
          <Grid xs={3}>
            <h5>Country</h5>
          </Grid>
          <Grid xs={7} alignContent="center">
            <TextField
              fullWidth
              size="small"
              inputProps={register("country")}
              color="secondary"
            />
          </Grid>
          {/*Textfield for Social profiles*/}
          <Grid xs={3}>
            <h5>Social profiles</h5>
          </Grid>
          <Grid container xs={7} alignContent="center" spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                inputProps={register("twitter")}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                inputProps={register("facebook")}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                inputProps={register("linkedin")}
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
          >
            Save changes
          </HRMButton>
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
