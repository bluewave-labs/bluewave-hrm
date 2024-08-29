import AvailableTimeOffTable from './AvailableTimeOffTable';

const policies = [
    {
        type: 'Vacation',
        availableDays: '15 days (180 hours)',
        hoursUsed: '23 hours used'
    },
    {
        type: 'Sick',
        availableDays: '180 hours left',
        hoursUsed: '23 hours used'
    },
    {
        type: 'Bereavement',
        availableDays: '-',
        hoursUsed: '23 hours used'
    }
];

//Storybook display settings
export default {
    title: 'TimeOffMenu/AvailableTimeOffTable',
    component: AvailableTimeOffTable,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each AvailableTimeOffTable type
export const Primary = {
    args: {
        policies: policies
    }
};