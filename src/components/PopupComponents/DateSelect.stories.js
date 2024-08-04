import DateSelect from './DateSelect';

//Storybook display settings
export default {
    title: 'PopupMenus/DateSelect',
    component: DateSelect,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each DateSelect type
export const Primary = {
    args: {
        close: () => {},
        setDate: (value) => {}
    }
};