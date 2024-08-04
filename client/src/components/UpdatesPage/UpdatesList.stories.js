import UpdatesList from './UpdatesList';

const updates = [
    {
        status: 'new',
        name: 'New time off request',
        desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
    },
    {
        status: 'waiting',
        name: 'New team member added',
        desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
    },
    {
        status: 'seen',
        name: 'Your time off request has been sent',
        desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
    },
    {
        status: 'seen',
        name: 'New time off request',
        desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
    },
    {
        status: 'seen',
        name: 'New team member added',
        desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
    }
];

//Storybook display settings
export default {
    title: 'HomeMenu/UpdatesList',
    component: UpdatesList,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each UpdateList type
export const Primary = {
    args: {
        updates: updates
    }
};