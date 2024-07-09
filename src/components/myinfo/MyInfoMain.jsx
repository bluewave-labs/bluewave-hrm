import Stack from '@mui/system/Stack';
import HRMButton from '../Button/HRMButton';
import MyInfoPersonCard from './MyInfoPersonalCard';
import { useNavigate } from 'react-router-dom';
import Page from '../StaticComponents/Page';
import React, { useContext } from 'react';
import EmployeeContext from './EmployeeContext';


export default function MyInfoMain(style) {
    
    const navigate = useNavigate();
    const { employee, loading } = useContext(EmployeeContext);
    
    if (loading) {
        return <div>Loading...</div>
    }

    if (!employee) {
        return <div>Error loading employee data.</div>
    }
    return (

        <Page style={style} >
            {/*Main page content*/}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    marginBottom: "40px"
                }}
            >
                <h2 style={{fontSize:'24px', fontFamily:'Inter', fontWeight:'600', color:'#101828'}}>{employee.firstName} {employee.lastName}</h2>
                <HRMButton onClick={() => { navigate('/myinfoedit') }} mode={'primary'} sx={{borderRadius:'8px',width:'60px', height:'34px'}}>Edit</HRMButton>
            </Stack>
            <MyInfoPersonCard key={employee.empId} employee={employee} />
        </Page>
    );
};

MyInfoMain.propTypes = {};

