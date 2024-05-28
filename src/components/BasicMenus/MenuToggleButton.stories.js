import MenuToggleButton from './MenuToggleButton';
import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from './MenuItem';

const selectableContent = (
    <Box sx={{ 
        width: '100%', 
        maxWidth: 360, 
        border: "1px solid #EAECF0", 
        borderRadius: 2 
    }}>
        <List>
            <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                <MenuItem>Name</MenuItem>
            </ListItem>
            <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                <MenuItem>Status</MenuItem>
            </ListItem>
            <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                <MenuItem>Role</MenuItem>
            </ListItem>
            <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                <MenuItem>Team</MenuItem>
            </ListItem>
            <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                <MenuItem>Hire date</MenuItem>
            </ListItem>
            <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                <MenuItem>Employee No</MenuItem>
            </ListItem>
            <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                <MenuItem>Employment status</MenuItem>
            </ListItem>
        </List>
    </Box>
);

//Storybook display settings
export default {
    title: 'BasicMenus/ToggleButton',
    component: MenuToggleButton,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each ToggleButton type
export const Primary = {
    args: {
        menuComponent: selectableContent,
        icon: <TuneIcon />,
        label: 'Customize'
    }
};