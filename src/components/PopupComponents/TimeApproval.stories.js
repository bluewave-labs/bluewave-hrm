import TimeApproval from './TimeApproval';
import AvatarImage from '../../Images/a99b7c47182d3a04f5f3ed31db0dd8a6.jpg';

//Storybook display settings
export default {
    title: 'PopupMenus/TimeApproval',
    component: TimeApproval,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each TimeApproval type
export const Primary = {
    args: {
        user_information: {
            avatar: AvatarImage,
            name: 'Gabriel Chan',
            role: 'Front End Developer',
            email: 'gabriel.chan@bluewavelabs.ca',
            office: 'Toronto',
            effectiveDate: '1 January 2024',
            timeOffBalance: '18 days',
            timeOffRequested: '1 Oct - 4 Oct',
            requestedDaysTotal: '2 days',
            timeOffCategory: 'Vacation',
            description: 'Talked with my manager.'
        }
    }
};