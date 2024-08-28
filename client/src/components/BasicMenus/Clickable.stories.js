import Chip from '@mui/material/Chip';
import TuneIcon from '@mui/icons-material/Tune';

const handleClick = () => {
    console.info('You clicked the Chip.');
};

//Storybook display settings
export default {
    title: 'BasicMenus/Clickable',
    component: Chip,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each Clickable type
export const Primary = {
    args: {
        icon: <TuneIcon />,
        label: 'Customize',
        variant: 'outlined',
        onClick: handleClick,
        sx: {borderRadius: "4px"}
    }
};