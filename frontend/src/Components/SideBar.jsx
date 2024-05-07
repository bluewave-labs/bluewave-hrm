import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ToggleButton from './ToggleBtn'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';

// const commonStyles = {
//   bgcolor: 'background.paper',
//   m: 1,
//   border: 1,
//   width: '5rem',
//   height: '5rem',
// };

// export default function BorderColor() {
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//       <Box sx={{ ...commonStyles, borderColor: 'primary.main' }} />
//       <Box sx={{ ...commonStyles, borderColor: 'secondary.main' }} />
//       <Box sx={{ ...commonStyles, borderColor: 'error.main' }} />
//       <Box sx={{ ...commonStyles, borderColor: 'grey.500' }} />
//       <Box sx={{ ...commonStyles, borderColor: 'text.primary' }} />
//     </Box>
//   );
// }


const SideBar = () => {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };


  return (
    <Box
    disableGutters
    height={811}
    width={460}
    marginLeft={30}
    marginTop={30}
    boxShadow={5}
   
    // sx={{boxShadow: 5}}
   >
    
      
      <Box
        display="flex"
        alignItems="center"
        borderBottom={1}
        justifyContent={'space-between'}
        sx={{px:'20px', borderColor:'#D0D5DD', bgcolor: '#F8F9F8', width: '100' }}
        >
          <Typography>Settings</Typography>
          <IconButton >
            <CloseIcon />
          </IconButton>
      </Box>
     
      <Box pt={2} px={3}>
        <Typography sx={{mb:'50px'}}>Main dashboard - first login tour</Typography>

      <Box mb={'20px'} >
        <Typography>Status</Typography>
        <ToggleButton/>
      </Box>
         

        
          <Typography mb={'10px'}>Tour name</Typography>
          <TextField size='small' sx = {{width:'100%',mb:'30px'}}/>
          <Typography mb={'10px'}>Description</Typography>
          <TextField size='small' sx = {{width:'100%',mb:'30px' }}/>
          <Typography mb={'10px'}>Page targeting</Typography>
          <Stack direction="row" spacing={2} sx={{mb:'30px'}}>
            <FormControl>
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                size='small'
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem value="">
                  Equals to
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Only show when the page URL matches.</FormHelperText>
            </FormControl>
            <TextField sx = {{width:'50%'}} size='small'   label="/"variant="outlined"/>
          </Stack>
        
        <Typography mb={'10px'}>Triggering frequency</Typography>
        <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                size='small'
                inputProps={{ 'aria-label': 'Without label' }}
                sx = {{width:'100%',mb:'30px'}}>
                <MenuItem value="">
                  Just once
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
       
     
        <Typography mb={'10px'}>Theme</Typography>
        <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                size='small'
                inputProps={{ 'aria-label': 'Without label' }}
                sx = {{width:'100%',mb:'30px'}}>
                <MenuItem value="">
                 Default theme
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
       
      </Box>
        
     </Box>

  ) 
}

export default SideBar