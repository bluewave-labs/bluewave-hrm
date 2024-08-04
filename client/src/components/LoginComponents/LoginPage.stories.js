import LoginPage from './LoginPage';

//Storybook display settings
export default {
    title: 'Login/LoginPage',
    component: LoginPage,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each LoginPage type
export const Primary = {
    args: {}
}