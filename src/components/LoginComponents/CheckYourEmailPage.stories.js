import CheckYourEmailPage from './CheckYourEmailPage';

//Storybook display settings
export default {
    title: 'Login/CheckYourEmailPage',
    component: CheckYourEmailPage,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each CheckYourEmailPage type
export const Primary = {
    args: {}
};