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
export default function SetupDepartmentsMenu({advancePage, style}) {
    //Hooks for each department item
    const [CSDepartment, setCSDepartment] = useState(false);
    const [designDepartment, setDesignDepartment] = useState(false);
    const [financeDepartment, setFinanceDepartment] = useState(false);
    const [HRDepartment, setHRDepartment] = useState(false);
    const [ITDepartment, setITDepartment] = useState(false);
    const [managementDepartment, setManagementDepartment] = useState(false);
    const [marketingDepartment, setMarketingDepartment] = useState(false);
    const [operationsDepartment, setOperationsDepartment] = useState(false);
    const [salesDepartment, setSalesDepartment] = useState(false);

    const url = "http://localhost:5000/api/departments/";

    //Organizing and formatting department items
    const departmentItems = {
        "Customer Success": [CSDepartment, setCSDepartment],
        "Design": [designDepartment, setDesignDepartment],
        "Finance": [financeDepartment, setFinanceDepartment],
        "Human Resources": [HRDepartment, setHRDepartment],
        "Information Technology": [ITDepartment, setITDepartment],
        "Management": [managementDepartment, setManagementDepartment],
        "Marketing": [marketingDepartment, setMarketingDepartment],
        "Operations": [operationsDepartment, setOperationsDepartment],
        "Sales": [salesDepartment, setSalesDepartment]
    };

    const formattedDepartments = divideIntoThree(departmentItems);
    
    //Track each selected item
    const activeStates = [];
    Object.entries(departmentItems).map(([k, v]) => {
        if (v[0]) {activeStates.push(k)}
    });

    async function handleSubmit() {
        for (const item of activeStates) {
            const data = JSON.stringify({
                departmentName: item,
                departmentManagerId: 1
            })

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
            width: "1003px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Text*/}
            <h3 style={{margin: "1em auto", textAlign: "center"}}>
                Select the departments to add
            </h3>
            <p style={{margin: "1em auto 80px", textAlign: "center"}}>
                You can modify the name or add more departments later
            </p>
            {/*Buttons*/}
            {formattedDepartments.map((list) => (
                <Stack 
                    direction="row" 
                    alignItems="center" 
                    justifyContent="space-between" 
                    spacing={3}
                    sx={{marginY: "20px"}}
                >
                    {list.map((item) => (
                        <SelectItem 
                            state={item[1][0]} 
                            setState={item[1][1]}
                            style={{flex: 1}}
                        >
                            {item[0]}
                        </SelectItem>
                    ))}
                </Stack>
            ))}
            {/*Add departments button*/}
            <HRMButton 
                mode="primary" 
                enabled={activeStates.length >= 3} 
                onClick={handleSubmit}
                style={{
                    float: "right",
                    marginTop: "80px"
                }}
            >
                Add Departments
            </HRMButton>
        </Box>
    );
};

//Control panel settings for storybook 
SetupDepartmentsMenu.propTypes = {
    //States and setState functions stored in object
    departmentItems: PropTypes.object
};

//Default values for this component
SetupDepartmentsMenu.defaultProps = {
    style: {}
};