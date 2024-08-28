import Box from '@mui/system/Box';
<<<<<<< HEAD
=======
import Stack from '@mui/system/Stack';
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
import Grid from '@mui/system/Unstable_Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
<<<<<<< HEAD
import UploadFile from './UploadFile';
import HRMButton from '../Button/HRMButton';
=======
import { useState } from 'react';
import { colors, fonts } from '../../Styles';
import UploadFile from './UploadFile';
import HRMButton from '../Button/HRMButton';
const axios = require('axios');
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea

/**
 * Setup menu component for onboarding purposes. Contains a text field for a company's name 
 * and website and other components for uploading a company logo.
 * 
 * Props:
<<<<<<< HEAD
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SetupCompanyMenu({style}) {
    return(
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            paddingTop: 6,
            paddingX: 10,
            paddingBottom: 20,
            fontFamily: "Inter, sans-serif"
=======
 * - advancePage<Function>: Function from the parent component to advance to the next menu
 *      Syntax: advancePage()
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SetupCompanyMenu({advancePage, style}) {
    //State variables for holding the new company's information
    const [companyName, setCompanyName] = useState(null);
    const [companyWebsite, setCompanyWebsite] = useState(null);
    const [companyLogo, setCompanyLogo] = useState(null);

    //URL to be used for API requests
    const url = `${process.env.URL}/company/`;

    //Function for creating the POST request and setting the new menu component
    async function handleSubmit() {
        //Parse data into JSON format
        const data = {
            id: 1,
            companyName: companyName,
            companyWebsite: companyWebsite,
            companyLogo: companyLogo,
            administratorEmail: null,
            companyDomain: null,
            streetAddress: null,
            unitSuite: null,
            city: null,
            country: null,
            stateProvince: null,
            postalZipCode: null
        };

        //Send the PUT request 
        axios.put(url, data)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            advancePage();
        });
    }

    return(
        <Box sx={{...{
            //boxSizing: "border-box",
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            paddingTop: 6,
            paddingX: "18%",
            paddingBottom: 20,
            backgroundColor: "#FFFFFF",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
        }, ...style}}>
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
<<<<<<< HEAD
                    <TextField fullWidth size="small" />
=======
                    <TextField onChange={(e) => setCompanyName(e.target.value)} fullWidth size="small" />
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
                </Grid>
                {/*Textfield for company website*/}
                <Grid xs={3}>
                    <h5>Company website</h5>
                </Grid>
                <Grid xs={7} alignContent="center">
                    <TextField 
<<<<<<< HEAD
=======
                        onChange={(e) => setCompanyWebsite("https://" + e.target.value)}
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
                        fullWidth
                        InputProps={{startAdornment: <InputAdornment position="end">https://</InputAdornment>}}
                        size="small"
                    />
                </Grid>
                {/*Section for uploading company logo*/}
                <Grid xs={3}>
                    <h5>Company logo</h5>
                </Grid>
                <Grid xs={7} sx={{display: "flex", justifyContent: "center"}}>
<<<<<<< HEAD
                    <AddPhotoAlternateOutlinedIcon 
                        sx={{
                            backgroundColor: "#F2F4F7",
                            width: 35,
                            height: 35,
                            padding: 2,
                            marginRight: 2,
                            borderRadius: "50%"
                        }} 
                    />
                    <UploadFile />
                </Grid>
            </Grid>
            {/*Add company button*/}
            <HRMButton mode="primary" style={{
=======
                    <Stack 
                        direction="row" 
                        alignItems="center" 
                        justifyContent="space-between"
                        sx={{width: "100%"}}
                    >
                    {(companyLogo) ? 
                        <img src={companyLogo} style={{
                            width: "175px", 
                            height: "100px", 
                            marginRight: "50px"
                        }} /> :
                        <AddPhotoAlternateOutlinedIcon 
                            sx={{
                                backgroundColor: "#F2F4F7",
                                width: "32px",
                                height: "32px",
                                padding: "32px",
                                marginRight: "50px",
                                borderRadius: "50%"
                            }} 
                    />
                    }  
                    <UploadFile setFile={setCompanyLogo} />
                    </Stack>
                </Grid>
            </Grid>
            {/*Add company button*/}
            <HRMButton mode="primary" onClick={handleSubmit} style={{
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
                float: "right",
                marginTop: "80px"
            }}>
                Add Company
            </HRMButton>
        </Box>
    );
};

//Control panel settings for storybook 
SetupCompanyMenu.propTypes = {};

//Default values for this component
SetupCompanyMenu.defaultProps = {
    style: {}
};