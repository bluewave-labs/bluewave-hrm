import Stack from '@mui/system/Stack';
import HRMButton from '../Button/HRMButton';
import MyInfoPersonalCard from './MyInfoPersonalCard';
//import { useNavigate } from 'react-router-dom';
import Page from '../StaticComponents/Page';
import React, { useContext } from 'react';
//import EmployeeContext from './EmployeeContext';
import { Box } from '@mui/material';
import StateContext from "../../context/StateContext";


export default function MyInfoMain({style, onClickEdit}) {
    
    const {state} = useContext(StateContext);
    const employee = state.employee;
    
    if (!employee) {
        return <div style={{paddingTop:"25px"}}>No record to display.</div>;
    }

    return (

        <Page style={style} >
            {/*Main page content*/}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    marginTop: "40px"
                }}
            >
                <h2 
                    style={{
                        fontSize:'24px', 
                        fontFamily:'Inter', 
                        fontWeight:'600', 
                        color:'#101828',
                        marginTop:"0px"
                    }} 
                >
                    {employee.firstName} {employee.lastName}
                </h2>
                <Box sx={{display: 'flex',flexDirection: 'row',justifyContent: 'center' }}>
                    <HRMButton 
                        onClick={()=>{
                            console.log("called");
                            if(onClickEdit){
                                onClickEdit(true);
                            }
                        }}
                        mode={'primary'} 
                        style={{
                            borderRadius:'8px',
                            width:'60px', 
                            height:'34px', 
                            margin:'8px'
                        }}
                    >
                        Edit
                    </HRMButton>
                </Box>
            </Stack>
            {/*My Info main page content*/}
            <MyInfoPersonalCard key={employee.empId} employee={employee} />
        </Page>
    );
};

MyInfoMain.propTypes = {};

