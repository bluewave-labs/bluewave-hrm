import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import MenuItem from '../BasicMenus/MenuItem';

const basicContent = (
    <>
        <List>
            <ListItem sx={{width: 300}} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PersonOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="View profile" />
                </ListItemButton>
            </ListItem>
            <ListItem sx={{width: 300}} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <SettingsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem sx={{width: 300}} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <HomeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Company profile" />
                </ListItemButton>
            </ListItem>
            <ListItem sx={{width: 300}} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Team" />
                </ListItemButton>
            </ListItem>
            <ListItem sx={{width: 300}} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PersonAddAlt1OutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Invite colleagues" />
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem sx={{width: 300}} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ExitToAppOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                </ListItemButton>
            </ListItem>
        </List>
    </>
);

const selectableContent = (
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
);

//Storybook display settings
export default {
    title: 'PopupMenus/PopoverMenu',
    component: Box,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each PopoverMenu type
export const Basic = {
    args: {
        sx: { 
            width: '100%', 
            maxWidth: 360, 
            border: "1px solid #EAECF0", 
            borderRadius: 2 
        },
        children: basicContent
    }
};

export const Selectable = {
    args: {
        sx: { 
            width: '100%', 
            maxWidth: 360, 
            border: "1px solid #EAECF0", 
            borderRadius: 2,
        },
        children: selectableContent
    }
};