import UpcomingTimeOffTable from './UpcomingTimeOffTable';

const timeOffs = [
    {
        from: '11 January 2024',
        to: '11 January 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.'
    },
    {
        from: '11 January 2024',
        to: '11 January 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.'
    }
];

//Storybook display settings
export default {
    title: 'TimeOffMenu/UpcomingTimeOffTable',
    component: UpcomingTimeOffTable,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each UpcomingTimeOffTable type
export const Primary = {
    args: {
        timeOffs: timeOffs
    }
};