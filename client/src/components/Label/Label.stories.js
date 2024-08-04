import Label from './Label';

//Storybook display settings
export default {
    title: 'Visuals/Label',
    component: Label,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each Label type
export const Orange = {
    args: {
        mode: 'orange',
        label: 'Label'
    }
};

export const Gray = {
    args: {
        mode: 'gray',
        label: 'Label'
    }
};

export const Brand = {
    args: {
        mode: 'brand',
        label: 'Label'
    }
};

export const Success = {
    args: {
        mode: 'success',
        label: 'Label'
    }
};

export const New = {
    args: {
        mode: 'status',
        dot: 'orange',
        label: 'New'
    }
};

export const Waiting = {
    args: {
        mode: 'status',
        dot: 'red',
        label: 'Waiting'
    }
};

export const Seen = {
    args: {
        mode: 'status',
        dot: 'grey',
        label: 'Seen'
    }
};

export const Active = {
    args: {
        mode: 'status',
        dot: 'green',
        label: 'Active'
    }
};