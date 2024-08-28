import UserDropdown from './UserDropdown';
import AvatarImage from '../../Images/a99b7c47182d3a04f5f3ed31db0dd8a6.jpg';

//Storybook display settings
export default {
    title: 'StaticMenus/UserDropdown',
    component: UserDropdown,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each UserDropdown type
export const Primary = {
    args: {
        user: {
            avatar: AvatarImage,
            name: "Gabriel Chan",
            role: "Administrator"
        }
    }
};