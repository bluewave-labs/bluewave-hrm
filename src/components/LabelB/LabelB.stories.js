import LabelB from './LabelB';

//Storybook display settings
export default {
    title: 'Visuals/LabelB',
    component: LabelB,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each Label type
export const Seen = {
    args: {
        type: 'seen',
        children: 'Seen'
    }
};

export const Waiting = {
    args: {
        type: 'waiting',
        children: 'Waiting'
    }
};

export const New = {
    args: {
        type: 'new',
        children: 'New'
    }
};