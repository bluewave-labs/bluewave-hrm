import UpdatesNavBar from './UpdatesNavBar';

//Storybook display settings
export default {
    title: 'HomeMenu/UpdatesNavBar',
    component: UpdatesNavBar,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each UpdatesNavBar type
export const FewUpdates = {
    args: {
        numOfUpdates: 56,
        currentPage: 1
    }
};

export const MoreUpdates = {
    args: {
        numOfUpdates: 100,
        currentPage: 1
    }
};

export const SeveralUpdates = {
    args: {
        numOfUpdates: 164,
        currentPage: 8
    }
};