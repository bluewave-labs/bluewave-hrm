import TimeOffRequestSent from './TimeOffRequestSent';

//Storybook display settings
export default {
    title: 'PopupMenus/TimeOffRequestSent',
    component: TimeOffRequestSent,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each TimeOffRequestSent type
export const Primary = {
    args: {
        close: () => {}
    }
};