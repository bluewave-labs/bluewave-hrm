import SetupRolesMenu from './SetupRolesMenu';

//Storybook display settings
export default {
    title: 'Setup/SetupRolesMenu',
    component: SetupRolesMenu,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each SetupRolesMenu type
export const Primary = {
    args: {
        advancePage: () => {}
    }
};