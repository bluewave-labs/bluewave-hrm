import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { fonts } from '../Styles';

const boxContent = <>
    Search
    <TextField 
        helperText="This is a hint text to help user"
        placeholder="Search"
        size="small"
        margin="dense"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            )
        }}
    />
</>;

//Storybook display settings
export default {
    title: 'Interactables/SearchBar',
    component: Box,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

//Stories for each SearchBar type
export const Primary = {
    args: {
        sx: { 
            display: 'flex', 
            flexDirection: 'column', 
            fontFamily: fonts.fontFamily 
        },
        children: boxContent
    }
};