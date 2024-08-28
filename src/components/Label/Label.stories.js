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
<<<<<<< HEAD
        mode: 'new',
=======
        mode: 'status',
        dot: 'orange',
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
        label: 'New'
    }
};

export const Waiting = {
    args: {
<<<<<<< HEAD
        mode: 'waiting',
=======
        mode: 'status',
        dot: 'red',
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
        label: 'Waiting'
    }
};

export const Seen = {
    args: {
<<<<<<< HEAD
        mode: 'seen',
        label: 'Seen'
    }
=======
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
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
};