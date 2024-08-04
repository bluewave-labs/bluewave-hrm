import HRMButton from './HRMButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

//Storybook display settings
export default {
    title: 'Interactables/Button',
    component: HRMButton,
    argTypes: {
        mode: {
            options: ['primary', 'secondaryA', 'secondaryB', 'tertiary', 'error'],
            control: { type: 'radio' }
        },
        enabled: {
            control: { type: 'boolean' }
        }
    },
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each Button type
export const Primary = {
    args: {
        mode: 'primary',
        children: 'Button'
    }
};

export const SecondaryA = {
    args: {
        mode: 'secondaryA',
        children: 'Button'
    }
};

export const SecondaryB = {
    args: {
        mode: 'secondaryB',
        children: 'Button'
    }
};

export const Tertiary = {
    args: {
        mode: 'tertiary',
        children: 'Button'
    }
};

export const Error = {
    args: {
        mode: 'error',
        children: 'Button'
    }
};

export const Previous = {
    args: {
        mode: 'secondaryB',
        children: 'Previous',
        startIcon: <ArrowBackIcon />
    }
};

export const Next = {
    args: {
        mode: 'secondaryB',
        children: 'Next',
        endIcon: <ArrowForwardIcon />
    }
};