import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import Grid from "@mui/system/Unstable_Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useContext, useState } from "react";
import { colors, fonts } from "../../assets/Styles";
import UploadFile from "./UploadFile";
import HRMButton from "../Button/HRMButton";
import StateContext from "../../context/StateContext";
const api = require("../../assets/FetchServices")


/**
 * Setup menu component for onboarding purposes. Contains a text field for a company's name
 * and website and other components for uploading a company logo.
 *
 * Props:
 * - advancePage<Function>: Function from the parent component to advance to the next menu
 *      Syntax: advancePage()
 *
 * - style<Object>: Optional prop for adding further inline styling
 *      Default: {}
 */
export default function SetupCompanyMenu({ advancePage, style }) {
  //State variables for holding the new company's information
  const [companyName, setCompanyName] = useState(null);
  const [companyWebsite, setCompanyWebsite] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);

  const stateContext = useContext(StateContext);

    const getBinary = (data) =>{
        if(data){
        let startIndex = data.indexOf(",") + 1;
            return data.substring(startIndex);
        }
        return null;
    }

  //Function for creating the POST request and setting the new menu component
  async function handleSubmit() {
    //Parse data into JSON format
    const data = {
      companyName: companyName,
      companyWebsite: companyWebsite,
      companyLogo: getBinary(companyLogo),
      administratorEmail: stateContext.state.user && stateContext.state.user.email,
    };
    //Send the PUT request
      try {
       const response = await api.company.createOne(data);
       console.log(response);
       if(companyLogo){
        stateContext.updateState("logo", companyLogo);
       }
        
      } catch (error) {
        console.log(error);
      }
      finally{
         advancePage();
      }
  }

  return (
    <Box
      sx={{
        ...{
          //boxSizing: "border-box",
          border: "1px solid #EBEBEB",
          borderRadius: 2,
          paddingTop: 6,
          paddingX: "18%",
          paddingBottom: 20,
          backgroundColor: "#FFFFFF",
          color: colors.darkGrey,
          fontFamily: fonts.fontFamily,
        },
        ...style,
      }}
    >
      <Grid container columns={10} rowSpacing={2} columnSpacing={1}>
        <Grid xs={10} textAlign="center">
          <h3>Add fundamental company details</h3>
          <p>You can modify these later in settings</p>
        </Grid>
        {/*Textfield for company name*/}
        <Grid xs={3}>
          <h5>Company name</h5>
        </Grid>
        <Grid xs={7} alignContent="center">
          <TextField
            onChange={(e) => setCompanyName(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
        {/*Textfield for company website*/}
        <Grid xs={3}>
          <h5>Company website</h5>
        </Grid>
        <Grid xs={7} alignContent="center">
          <TextField
            onChange={(e) => setCompanyWebsite("https://" + e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">https://</InputAdornment>
              ),
            }}
            size="small"
          />
        </Grid>
        {/*Section for uploading company logo*/}
        <Grid xs={3}>
          <h5>Company logo</h5>
        </Grid>
        <Grid xs={7} sx={{ display: "flex", justifyContent: "center" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            {companyLogo ? (
              <img
                src={companyLogo}
                style={{
                  width: "175px",
                  height: "100px",
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
            <UploadFile setFile={setCompanyLogo} />
          </Stack>
        </Grid>
      </Grid>
      {/*Add company button*/}
      <HRMButton
        mode="primary"
        enabled={companyName}
        onClick={handleSubmit}
        style={{
          float: "right",
          marginTop: "80px",
        }}
      >
        Add Company
      </HRMButton>
    </Box>
  );
}

//Control panel settings for storybook
SetupCompanyMenu.propTypes = {};

//Default values for this component
SetupCompanyMenu.defaultProps = {
  style: {},
};
