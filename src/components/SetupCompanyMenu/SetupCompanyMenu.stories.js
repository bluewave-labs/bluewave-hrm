import SetupCompanyMenu from './SetupCompanyMenu';

//Storybook display settings
export default {
    title: 'Setup/SetupCompanyMenu',
    component: SetupCompanyMenu,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each SetupCompanyMenu type
export const Primary = {
    args: {
        advancePage: () => {}
    }
};