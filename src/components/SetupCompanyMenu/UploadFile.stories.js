import UploadFile from './UploadFile';

export default {
    title: 'Setup/UploadFile',
    component: UploadFile,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

export const Primary ={
    args: {
        setFile: (s) => {}
    }
};