import React from 'react'
import { Stack,Typography,TextField,Box, } from '@mui/material'
import Grid from '@mui/material/Grid';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';


const PopupMessage = () => {
  return (
    <>
       <Box  disableGutters
            width={812}
            height={108}
            margin={20}
            sx={{border:1,borderColor:'#D0D5DD'}}
            pt={'20px'}
            px={'20px'}
            pb={'20px'}
            flexGrow={1}>
        <Grid container>
        <Grid item xs={2}>
          <InfoOutlinedIcon/>
        </Grid>
        <Grid item xs={10}>
          <Stack>
            <Box sx={{ display: 'flex', justifyContent:'space-between'
             }} >
              <Typography fontWeight={'bold'}>We’ve just released a new feature</Typography>
              <CloseIcon/>
            </Box>
            <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.</Typography>
            <Stack disableGutters direction='row'>
              <Button sx={{ color: '#475467',fontWeight:'bold',pl:0 }} s variant="text">Dismiss</Button>
              <Button sx={{ color:'#6941C6', fontWeight:'bold'}}variant="text">View changes</Button>
            </Stack>
          </Stack>
        
        </Grid>
        </Grid>      
                   
       
      </Box>
    </>
   
    
  )
}

export default PopupMessage