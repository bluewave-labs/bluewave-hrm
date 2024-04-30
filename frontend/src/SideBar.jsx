import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ToggleButton from './ToggleBtn'
import TextField from '@mui/material/TextField';

const SideBar = () => {
  return (
    <Box
    disableGutters
    height={811}
    width={460}
    marginLeft={30}
    marginTop={30}
    
    sx={{ boxShadow: 3}} >
    
      
    <Box
      display="flex"
      alignItems="center"
      borderBottom={1}
    
      sx={{ borderColor:'#D0D5DD', bgcolor: '#F8F9F8', width: '100' }}
      >
      <Typography>Settings</Typography>
      <IconButton >
        <CloseIcon />
      </IconButton>
    </Box>
    <Typography>Main dashboard - first login tour</Typography>
    <Typography>Status</Typography>
    <ToggleButton/>
    <Typography>Tour name</Typography>
    <TextField
    />
    <Typography>Description</Typography>
    <TextField
    />
    <Typography>Page targeting</Typography>
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic"  label="Equals to" variant="outlined" />
      <TextField id="filled-basic"  label="/"variant="outlined"  />
      <Typography>Only show when the page URL matches.</Typography>
    </Box>
    <TextField
    />
     <Typography>Triggering frequency</Typography>
    <TextField
      label="Just once"
    />
    <Typography>Theme</Typography>
    <TextField
      label="Default theme"
    />

    </Box>

  )
}

export default SideBar