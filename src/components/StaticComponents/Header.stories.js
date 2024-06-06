import Box from '@mui/system/Box';
import Header from './Header';

//Storybook display settings
export default {
    title: 'StaticMenus/Header',
    component: Box,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each Header type
export const Primary = {
    args: {
        children: <Header />,
        sx: {
            minWidth: "1042px"
        }
    }
};