import React from 'react'
import { Stack,Typography,TextField,Box, } from '@mui/material'
import Grid from '@mui/material/Grid';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const FileUploadDialog = () => {

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const BorderLinearProgress = styled(LinearProgressWithLabel)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#7F56D9' : '#308fe8',
    },
  }));
  

  return (
    <>

      <Box  disableGutters
            width={512}
            margin={20}
            boxShadow={5}
            pt={'20px'}
            px={'20px'}
            pb={'20px'}
            flexGrow={1}>
        <Grid container>
        <Grid item xs={2}>
          <PictureAsPdfIcon/> 
        </Grid>
        <Grid item xs={10}>
          <Stack>
            <Box sx={{ display: 'flex', justifyContent:'space-between'
             }} >
              <Typography>Tech design requirements.pdf</Typography>
              <DeleteIcon/>
            </Box>
            <Typography>200 KB</Typography>
            <Box>
            <BorderLinearProgress variant="determinate" value={10} />
            </Box>
          </Stack>
        
        </Grid>
        </Grid>      
                   
       
      </Box>
    </>
  )
}

export default FileUploadDialog


{/* <Stack spacing={2}>
<Typography sx={{fontSize:'16px',fontWeight:'bold'}}>We’ve just released a new update!</Typography>
<Typography sx={{fontSize:'13px'}}>Check out the all new dashboard view. Pages and now load faster.</Typography>
<Typography sx={{fontSize:'13px',fontWeight:'bold'}}>Subscribe to updates</Typography>
<Stack spacing={2} direction="row">
<TextField placeholder='olivia@untitledui.com' size='small' sx = {{width:'40%',mb:'30px'}}/>

</Stack>
</Stack> */}