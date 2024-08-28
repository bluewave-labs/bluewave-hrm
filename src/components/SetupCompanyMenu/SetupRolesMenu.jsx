import Box from '@mui/system/Box';
<<<<<<< HEAD
import Grid from '@mui/system/Unstable_Grid';
import SelectItem from './SelectItem';
import HRMButton from '../Button/HRMButton';
=======
import Stack from '@mui/system/Stack';
import SelectItem from './SelectItem';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';
import { useState } from 'react';
import PropTypes from 'prop-types';
const axios = require('axios');

//Function for formatting the departments given in the props
function divideIntoThree(obj) {
    const entries = Object.entries(obj);
    let i = 0;
    const newList = [];
    while (i < entries.length) {
        newList.push(entries.slice(i, i + 3));
        i += 3;
    }
    return newList;
};
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea

/**
 * Setup menu component for onboarding purposes. Contains toggle buttons for displaying items to
 * be added.
 * 
 * Props:
<<<<<<< HEAD
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SetupRolesMenu({style}) {
    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            paddingTop: 6,
            paddingX: 10,
            paddingBottom: 20,
            fontFamily: "Inter, sans-serif",
        }, ...style}}>
            <Grid container columns={11} spacing={2}>
                {/*Text*/}
                <Grid xs={11} textAlign="center">
                    <h3>Select the roles to add</h3>
                    <p>You can modify the name or add more roles later</p>
                </Grid>
                {/*Buttons*/}
                <Grid xs={1}></Grid>
                <Grid xs={3}><SelectItem label="Account Manager" /></Grid>
                <Grid xs={3}><SelectItem label="Business Developer" /></Grid>
                <Grid xs={3}><SelectItem label="Chief Executive Officer" /></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}><SelectItem label="Customer Success Manager" /></Grid>
                <Grid xs={3}><SelectItem label="Customer Success Specialist" /></Grid>
                <Grid xs={3}><SelectItem label="Finance Manager" /></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}><SelectItem label="Human Resources Manager" /></Grid>
                <Grid xs={3}><SelectItem label="Marketing Manager" /></Grid>
                <Grid xs={3}><SelectItem label="Marketing Specialist" /></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}><SelectItem label="Product Manager" /></Grid>
                <Grid xs={3}><SelectItem label="Sales Manager" /></Grid>
                <Grid xs={3}><SelectItem label="Sales Representative" /></Grid>
                <Grid xs={1}></Grid>
            </Grid>
            {/*Add roles button*/}
            <HRMButton mode="primary" style={{
                float: "right",
                marginTop: "80px"
            }}>
=======
 * - advancePage<Function>: Function from the parent component to advance to the next menu
 *      Syntax: advancePage()
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SetupRolesMenu({advancePage, style}) {
    //State variables for each role item
    const [accountManagerRole, setAccountManagerRole] = useState(false);
    const [businessDeveloperRole, setBusinessDeveloperRole] = useState(false);
    const [CEORole, setCEORole] = useState(false);
    const [CSManagerRole, setCSManagerRole] = useState(false);
    const [CSSpecialistRole, setCSSpecialistRole] = useState(false);
    const [financeManagerRole, setFinanceManagerRole] = useState(false);
    const [HRManagerRole, setHRManagerRole] = useState(false);
    const [marketingManagerRole, setMarketingManagerRole] = useState(false);
    const [marketingSpecialistRole, setMarketingSpecialistRole] = useState(false);
    const [productManagerRole, setProductManagerRole] = useState(false);
    const [salesManagerRole, setSalesManagerRole] = useState(false);
    const [salesRepresentativeRole, setSalesRepresentativeRole] = useState(false);

    //URL to be used for API requests
    const url = `${process.env.URL}/roles/`;

    //Organizing and formatting role items
    const roleItems = {
        "Account Manager": [accountManagerRole, setAccountManagerRole],
        "Business Developer": [businessDeveloperRole, setBusinessDeveloperRole],
        "Chief Executive Officer": [CEORole, setCEORole],
        "Customer Success Manager": [CSManagerRole, setCSManagerRole],
        "Customer Success Specialist": [CSSpecialistRole, setCSSpecialistRole],
        "Finance Manager": [financeManagerRole, setFinanceManagerRole],
        "Human Resources Manager": [HRManagerRole, setHRManagerRole],
        "Marketing Manager": [marketingManagerRole, setMarketingManagerRole],
        "Marketing Specialist": [marketingSpecialistRole, setMarketingSpecialistRole],
        "Product Manager": [productManagerRole, setProductManagerRole],
        "Sales Manager": [salesManagerRole, setSalesManagerRole],
        "Sales Representative": [salesRepresentativeRole, setSalesRepresentativeRole]
    }

    const formattedRoles = divideIntoThree(roleItems);

    //Track each selected item
    const activeStates = [];
    Object.entries(roleItems).map(([k, v]) => {
        if (v[0]) {activeStates.push(k)}
    });

    /*
    //Function for creating the POST requests and setting the new menu component
    async function handleSubmit() {
        for (const item of activeStates) {
            //Parse data of each role into JSON format
            const data = {
                roleTitle: item,
                //Need function to retrieve actual minimum and maximum salary
                minimumSalary: 45000,   
                maximumSalary: 55000
            };

            //Send a POST request for each role
            try {
                const response = await axios.post(url, data);
                console.log(response);
            }
            catch (error) {
                console.log(error);
            }
        }
        advancePage();
    };
    */

    return (
        <Box sx={{...{
            boxSizing: "border-box",
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            paddingTop: 6,
            paddingX: "150px",
            paddingBottom: 20,
            backgroundColor: "#FFFFFF",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Text*/}
            <h3 style={{margin: "1em auto", textAlign: "center"}}>
                Select the roles to add
            </h3>
            <p style={{margin: "1em auto 80px", textAlign: "center"}}>
                You can modify the name or add more roles later
            </p>
            {/*Buttons*/}
            {formattedRoles.map((list) => (
                <Stack 
                    direction="row" 
                    alignItems="center" 
                    justifyContent="space-between" 
                    spacing={3}
                    sx={{marginY: "20px"}}
                >
                    {list.map((item) => (
                        <SelectItem state={item[1][0]} setState={item[1][1]} style={{flex: 1}}>
                            {item[0]}
                        </SelectItem>
                    ))}
                </Stack>
            ))}
            {/*Add roles button*/}
            <HRMButton 
                mode="primary" 
                enabled={activeStates.length >= 3} 
                onClick={advancePage}
                style={{
                    float: "right",
                    marginTop: "80px"
                }}
            >
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
                Add Roles
            </HRMButton>
        </Box>
    );
};

//Control panel settings for storybook 
<<<<<<< HEAD
SetupRolesMenu.propTypes = {};
=======
SetupRolesMenu.propTypes = {
    //States and setState functions stored in object
    roleItems: PropTypes.object
};
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea

//Default values for this component
SetupRolesMenu.defaultProps = {
    style: {}
};