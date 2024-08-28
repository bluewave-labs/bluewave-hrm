import Checkbox from './Checkbox';

//Storybook display settings
export default {
    title: 'Interactables/Checkbox',
    component: Checkbox,
<<<<<<< HEAD
=======
    argTypes: {
        enabled: {
            control: { type: 'boolean' }
        }
    },
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each checkbox type
export const Box = {
    args: {
        type: 'checkbox',
        id: 'test',
        name: 'name',
        value: 'value',
<<<<<<< HEAD
        size: 'small',
        enabled: true
=======
        onChange: () => {}
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
    }
};

export const Radio = {
    args: {
        type: 'radio',
        id: 'test',
        name: 'name',
        value: 'value',
<<<<<<< HEAD
        size: 'small',
        enabled: true
=======
        onChange: () => {}
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
    }
};