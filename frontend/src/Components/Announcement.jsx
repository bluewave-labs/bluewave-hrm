import React from 'react'
import Box from '@mui/material/Box';
import { Typography,TextField,Button,Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const Announcement = () => {


  const OutlinedButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#D0D5DD'),
    borderColor:"#D0D5DD",
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#D0D5DD',
    },
  }));

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#7F56D9'),
    backgroundColor: '#7F56D9',
    '&:hover': {
      backgroundColor: '#7F56D9',
    },
  }));
  

  return (
    <>
      <Box  disableGutters
            height={160}
            width={768}
            marginLeft={30}
            marginTop={30}
            boxShadow={5}
            pt={'20px'}
            px={'20px'}>
        <Stack spacing={2}>
        <Typography sx={{fontSize:'16px',fontWeight:'bold'}}>We’ve just released a new update!</Typography>
        <Typography sx={{fontSize:'13px'}}>Check out the all new dashboard view. Pages and now load faster.</Typography>
        <Stack spacing={2} direction="row">
          <OutlinedButton variant="outlined">Dismiss</OutlinedButton>
          <ColorButton variant="contained">Changelog</ColorButton>
        </Stack>
        </Stack>
       
      </Box>
    </>
  )
}

export default Announcement