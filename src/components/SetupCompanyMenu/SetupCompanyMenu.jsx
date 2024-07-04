import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useState } from 'react';
import { colors, fonts } from '../../Styles';
import UploadFile from './UploadFile';
import HRMButton from '../Button/HRMButton';

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
export default function SetupCompanyMenu({advancePage, style}) {
    const [companyName, setCompanyName] = useState(null);
    const [companyWebsite, setCompanyWebsite] = useState(null);
    const [companyLogo, setCompanyLogo] = useState(null);

    const url = "http://localhost:5000/api/company/"

    async function handleSubmit() {
        const data = JSON.stringify({
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
        });

        try {
            const response = await fetch(url, {
                method: "POST",
                body: data,
                headers: {"Content-type": "application/json"}
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
            }
        }
        catch (error) {
            console.log(error);
        }
        advancePage();
    }

    return(
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            paddingTop: 6,
            paddingX: "18%",
            paddingBottom: 20,
            backgroundColor: "#FFFFFF",
            color: colors.darkGrey,
            width: "1003px",
            fontFamily: fonts.fontFamily
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
                    <TextField onChange={(e) => setCompanyName(e.target.value)} fullWidth size="small" />
                </Grid>
                {/*Textfield for company website*/}
                <Grid xs={3}>
                    <h5>Company website</h5>
                </Grid>
                <Grid xs={7} alignContent="center">
                    <TextField 
                        onChange={(e) => setCompanyWebsite("https://" + e.target.value)}
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
                </Grid>
            </Grid>
            {/*Add company button*/}
            <HRMButton mode="primary" onClick={handleSubmit} style={{
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