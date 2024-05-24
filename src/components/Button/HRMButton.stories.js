import HRMButton from './HRMButton';

//Storybook display settings
export default {
    title: 'Interactables/Button',
    component: HRMButton,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each Button type
export const Primary = {
    args: {
        mode: 'primary',
        children: 'Button',
        enabled: true
    }
};

export const SecondaryA = {
    args: {
        mode: 'secondaryA',
        children: 'Button',
        enabled: true
    }
};

export const SecondaryB = {
    args: {
        mode: 'secondaryB',
        children: 'Button',
        enabled: true
    }
};

export const Tertiary = {
    args: {
        mode: 'tertiary',
        children: 'Button',
        enabled: true
    }
};

export const Error = {
    args: {
        mode: 'error',
        children: 'Button',
        enabled: true
    }
};
