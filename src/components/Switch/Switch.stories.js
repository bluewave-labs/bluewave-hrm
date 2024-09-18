import Switch from './Switch';

//Storybook display settings
export default {
    title: 'Interactables/Switch',
    component: Switch,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each Switch type
export const Primary = {
    args: {
        id: 'test',
        name: 'name',
        value: 'value',
        enabled: true
    }
};