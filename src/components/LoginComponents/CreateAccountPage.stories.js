import CreateAccountPage from './CreateAccountPage';

//Storybook display settings
export default {
    title: 'Login/CreateAccountPage',
    component: CreateAccountPage,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each CreateAccountPage type
export const Primary = {
    args: {}
};