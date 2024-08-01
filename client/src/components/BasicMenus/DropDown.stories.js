import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const team = [
    'Phoenix Baker',
    'Olivia Rhye',
    'Lana Steiner',
    'Demi Wilkinson',
    'Candice Wu',
    'Natali Craig',
    'Drew Cano'
];

//Storybook display settings
export default {
    title: 'BasicMenus/Dropdown',
    component: Autocomplete,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each Dropdown type
export const Primary = {
    args: {
        disablePortal: true,
        id: "combo-box-demo",
        options: team,
        sx: {width: 300},
        renderInput: (params) => <TextField {...params} placeholder="select team member" />
    }
};