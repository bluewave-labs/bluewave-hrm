import React from 'react';
import './TextFields.css';
import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import {  IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styled } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const StyledButton = styled (Button) ({ 
  color: '#344054', 
  height: '34px',
  textTransform: "none",
  fontSize:'13px',
  fontFamily:'Inter',
  fontWeight:'regular',
  
});


const CssWebTextField = styled(TextField)({

    width: '320px',
    height: '34px',

    '& .MuiInputAdornment-root': {
      color: '#667085', 
      fontSize:'13px',
      fontFamily:'Inter',
      fontWeight:'regular',
      
    },
    '& .MuiInputBase-input': {
      color: '#667085', 
      fontSize: '13px',
      
    },
    
    '& .MuiInputBase-root': { 
        m: 1, height:'34px' 
    },
    '& label.Mui-focused': {
      color: '#D0D5DD',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#D0D5DD',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#D0D5DD',
      },
      '&:hover fieldset': {
        borderColor: '#AEBDBD',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#AEBDBD',
      }
      
      },
    

});

const CssMailTextField = styled(TextField)({

    width: '320px',
    height: '34px',
   
    '& .MuiInputBase-input': {
      color: '#667085', 
      fontSize:'13px',
      fontFamily:'Inter',
      fontWeight:'regular',
    },

    '& .MuiInputBase-root': { 
        m: 1, height:'34px' 
    },
    '& label.Mui-focused': {
      color: '#D0D5DD',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#D0D5DD',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#D0D5DD',
      },
      '&:hover fieldset': {
        borderColor: '#D6BBFB',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#D6BBFB',
      },
      '&.Mui-error fieldset': {
        borderColor: '#F04438', // Red color for error state
      },
      '&.Mui-error:hover fieldset': {
        borderColor: '#FDA29B', // Red color on hover when in error state
      },
    },

});



export const TextFields = (hasError) => {
  return (
    <Box >
      <Grid container spacing={2} columns={16}>
        <Grid xs={8} >
     
          {/*Website*/}
          <div className='container' >                
                <h2 className="header">Website</h2>                            
                <CssWebTextField 

                    id="internet-speed"
                    placeholder='www.untitledui.com'
                    InputProps={{ 
                        startAdornment:
                        <InputAdornment disableTypography position="start"> 
                            http://
                        </InputAdornment>, 

                        endAdornment:  
                        <InputAdornment disableTypography position="end"> 
                            <IconButton size='small'>
                              <HelpOutlineIcon sx={{color:'#98A2B3', height: '16px', width: '16px', strokeWidth: '1.33px'}} ></HelpOutlineIcon>
                            </IconButton>
                        </InputAdornment>, 
                    }} 
                />   
                <p className="hint">This is a hint text to help user.</p>
          </div>
       
          {/*Email  */}
          <div className="container">
            <h2 className="header">Email</h2>
            
            <CssMailTextField 
                id="internet-speed"
                placeholder='olivia@untitledui.com'   
            /> 
            <p className="hint">This is a hint text to help user.</p>
          </div>     
          
          {/*Email with error */}
          <div className="container" >
            <h2 className="header">Email</h2>  
            <CssMailTextField    
            error={hasError}
              id="internet-speed"
              placeholder='olivia@untitledui.com'
              color='warning'
              InputProps={{ 
                endAdornment:  
                <InputAdornment disableTypography position="end"> 
                  <IconButton size='small'>
                    <ErrorOutlineIcon sx={{color:'#F04438', height: '16px', width: '16px', strokeWidth: '1px'}}></ErrorOutlineIcon>
                    
                  </IconButton>
                </InputAdornment>, 
              }} 
            /> 
            <p className="hint-error">This is an error message.</p>
          </div>

          {/*Email with help icon  */}
          <div className="container">                    
            <h2 className="header">Email</h2>
            
            <CssMailTextField 
              id="internet-speed"
              placeholder='olivia@untitledui.com'
              InputProps={{                             
                endAdornment:  
                <InputAdornment disableTypography position="end"> 
                  <IconButton size='small'>
                  <HelpOutlineIcon sx={{color:'#98A2B3', height: '16px', width: '16px', strokeWidth: '1.33px'}} ></HelpOutlineIcon>
                  </IconButton>
                </InputAdornment>, 
              }}                        
            />                    
            <p className="hint">This is a hint text to help user.</p>                      
          </div>
            
          {/*Website with copy button */}
          <div className="container">
                <h2 className="header">Website</h2>       
                <CssWebTextField 
                    sx={{ width: 400, height: 34 }}
                    id="internet-speed"
                    placeholder='www.untitledui.com'
                    InputProps={{ 
                        endAdornment:  
                        <InputAdornment disableTypography position="end"> 
                            <IconButton size='small'>
                            <HelpOutlineIcon sx={{color:'#98A2B3', height: '16px', width: '16px', strokeWidth: '1.33px'}} ></HelpOutlineIcon>
                            </IconButton>
                            <Divider orientation="vertical" flexItem />
                            <StyledButton startIcon={<ContentCopyIcon sx={{color:'#667085', height: '16px', width: '16px', strokeWidth: '1.5px'}} ></ContentCopyIcon>}>
                                Copy
                            </StyledButton>
                        </InputAdornment>, 
                    }} 
                />  
                <p className="hint">This is a hint text to help user.</p>       
          </div>
        </Grid>

        <Grid xs={8}>
          <div className="container-description">
            <h2 className="header">Description</h2>
              <div className="card">
                <textarea
                id="description"
                className="description-input"
               
                placeholder="Enter a description..."
                aria-label="Enter a description"
                ></textarea>
                
              </div>
            <p className="hint">This is a hint text to help user.</p>
          </div>
      
          <div className="container-description">
            <h2 className="header">Description</h2>
            <div className="card">
              <textarea
              id="description"
              className="description-input"
              placeholder="Enter a description..."
              aria-label="Enter a description"
              ></textarea>
            </div>
            <p className="hint-description">This is a hint text to help user.</p>
          </div>

          <div className="container-description">
            <h2 className="header">Description</h2>
            <div className="card-error">
              <textarea
              id="description"
              className="description-input"
              placeholder="Enter a description..."
              aria-label="Enter a description"
              ></textarea>
            </div>
            <p className="hint-error">This is an error message.</p>
          </div>

          
        </Grid>
      </Grid>
    </Box>
  )
}

