import Progress from './Progress';

//Storybook display settings
export default {
    title: 'Visuals/Progress',
    component: Progress,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each Progress type
export const Primary = {
    args: {
        value: '30'
    }
};