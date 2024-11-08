import BoardTabContent from './BoardTabContent';
import AvatarImage from '../../Images/a99b7c47182d3a04f5f3ed31db0dd8a6.jpg';

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

const timeOffPeriods = [
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Approved'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Rejected'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Rejected'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Approved'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Approved'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Approved'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Rejected'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Approved'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Approved'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Rejected'
    },
    {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        },
        from: '11 Jan 2024',
        to: '11 Jan 2024',
        type: 'Vacation',
        amount: '32 hours',
        note: 'Family in town for the holidays.',
        status: 'Waiting'
    },
];

//Storybook display settings
export default {
    title: 'TimeOffMenu/BoardTabContent',
    component: BoardTabContent,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each BoardTabContent type
export const Primary = {
    args: {
        policies: policies,
        timeOffPeriods: timeOffPeriods
    }
};