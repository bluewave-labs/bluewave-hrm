import SelectItem from './SelectItem';

//Storybook display settings
export default {
    title: 'Setup/SelectItem',
    component: SelectItem,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each SelectItem type
export const Primary = {
    args: {
        children: 'Label'
    }
};