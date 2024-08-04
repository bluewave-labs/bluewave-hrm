import TimeOffRequestSentWindow from './TimeOffRequestSentWindow';

//Storybook display settings
export default {
    title: 'PopupMenus/TimeOffRequestSentWindow',
    component: TimeOffRequestSentWindow,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each TimeOffRequestSentWindow
export const Primary = {
    args: {
        request_information: {
            timeOffBalance: '18 days',
            timeOffRequested: '1 Oct - 4 Oct',
            requestedDaysTotal: '2 days',
            timeOffCategory: 'Vacation',
            notes: 'I will be on vacation for 2 days. Thank you'
        },
        close: () => {}
    }
};