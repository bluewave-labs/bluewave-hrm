import MenuItem from './MenuItem';

//Storybook display settings
export default {
    title: 'BasicMenus/MenuItem',
    component: MenuItem,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each MenuItem type
export const Primary = {
    args: {
        children: "Menu Item"
    }
};