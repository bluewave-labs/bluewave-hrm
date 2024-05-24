import LabelA from './LabelA';

//Storybook display settings
export default {
    title: 'Visuals/LabelA',
    component: LabelA,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each Label type
export const Orange = {
    args: {
        mode: 'orange',
        children: 'Label'
    }
};

export const Gray = {
    args: {
        mode: 'gray',
        children: 'Label'
    }
};

export const Brand = {
    args: {
        mode: 'brand',
        children: 'Label'
    }
};

export const Success = {
    args: {
        mode: 'success',
        children: 'Label'
    }
};