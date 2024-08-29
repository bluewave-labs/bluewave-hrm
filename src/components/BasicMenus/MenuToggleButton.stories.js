import MenuToggleButton from './MenuToggleButton';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';

function parentComponent() {
    const [nameSelected, setNameSelected] = useState(false);
    const [statusSelected, setStatusSelected] = useState(false);
    const [roleSelected, setRoleSelected] = useState(false);
    const [teamSelected, setTeamSelected] = useState(false);
    const [hireDateSelected, setHireDateSelected] = useState(false);
    const [employeeNoSelected, setEmployeeNoSelected] = useState(false);
    const [employmentStatusSelected, setEmploymentStatusSelected] = useState(false);

    const menuItems = {
        "Name": [nameSelected, setNameSelected],
        "Status": [statusSelected, setStatusSelected],
        "Role": [roleSelected, setRoleSelected],
        "Team": [teamSelected, setTeamSelected],
        "Hire date": [hireDateSelected, setHireDateSelected],
        "Employee No": [employeeNoSelected, setEmployeeNoSelected],
        "Employment Status": [employmentStatusSelected, setEmploymentStatusSelected]
    }

    return (
        <MenuToggleButton label="Customize" menuItems={menuItems} icon={<TuneIcon />} />
    );
}

//Storybook display settings
export default {
    title: 'BasicMenus/ToggleButton',
    component: parentComponent,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each ToggleButton type
export const Primary = {
    args: {}
};