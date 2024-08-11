import SetupDepartmentsMenu from './SetupDepartmentsMenu';

//Storybook display settings
export default {
    title: 'Setup/SetupDepartmentsMenu',
    component: SetupDepartmentsMenu,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each SetupDepartmentsMenu type
export const Primary = {
    args: {
        advancePage: () => {}
    }
};