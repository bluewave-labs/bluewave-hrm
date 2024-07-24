import Box from '@mui/system/Box';
import SideMenu from './SideMenu';

export default {
    title: 'StaticMenus/SideMenu',
    component: Box,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

export const Primary = {
    args: {
        children: <SideMenu />,
        sx: {
            width: "1440px",
            height: "1056px"
        }
    }
};