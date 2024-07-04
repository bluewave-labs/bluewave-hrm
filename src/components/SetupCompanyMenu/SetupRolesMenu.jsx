import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import SelectItem from './SelectItem';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';
import { useState } from 'react';
import PropTypes from 'prop-types';

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

/**
 * Setup menu component for onboarding purposes. Contains toggle buttons for displaying items to
 * be added.
 * 
 * Props:
 * - advancePage<Function>: Function from the parent component to advance to the next menu
 *      Syntax: advancePage()
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SetupRolesMenu({advancePage, style}) {
    //Hooks for each role item
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

    const url = "http://localhost:5000/api/roles/";

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

    async function handleSubmit() {
        for (const item of activeStates) {
            const data = JSON.stringify({
                roleTitle: item,
                minimumSalary: 45000,
                maximumSalary: 55000
            })

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: data,
                    headers: {'Content-type': 'application/json'}
                });
                if (response.ok) {
                    const jsonResponse = await response.json();
                    console.log(jsonResponse);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        advancePage();
    };

    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            paddingTop: 6,
            paddingX: "18%",
            paddingBottom: 20,
            backgroundColor: "#FFFFFF",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily,
            width: "1003px"
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
                onClick={handleSubmit}
                style={{
                    float: "right",
                    marginTop: "80px"
                }}
            >
                Add Roles
            </HRMButton>
        </Box>
    );
};

//Control panel settings for storybook 
SetupRolesMenu.propTypes = {
    //States and setState functions stored in object
    roleItems: PropTypes.object
};

//Default values for this component
SetupRolesMenu.defaultProps = {
    style: {}
};