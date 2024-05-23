import React from 'react';
import './TextFields.css';
import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import {  IconButton, SvgIcon } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styled } from '@mui/material/styles';

const StyledButton = styled (Button) ({ 
  color: '#667085', 
  height: '34px',
  
});


const CssWebTextField = styled(TextField)({

    width: '320px',
    height: '34px',
    
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
        borderColor: '#AEBDBD',
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
                        <InputAdornment disableTypography position="end"> 
                            http://
                        </InputAdornment>, 

                        endAdornment:  
                        <InputAdornment disableTypography position="end"> 
                            <IconButton size='small'>
                            <SvgIcon>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_46_129)">
                                    <path d="M6.06004 6C6.21678 5.55444 6.52614 5.17873 6.93334 4.93942C7.34055 4.7001 7.8193 4.61262 8.28483 4.69247C8.75035 4.77232 9.17259 5.01434 9.47676 5.37568C9.78093 5.73702 9.94741 6.19434 9.94671 6.66666C9.94671 8 7.94671 8.66666 7.94671 8.66666M8.00004 11.3333H8.00671M14.6667 8C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8C1.33337 4.3181 4.31814 1.33333 8.00004 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_46_129">
                                        <rect width="16" height="16" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            </SvgIcon>
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
                    <SvgIcon>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.00004 5.33334V8.00001M8.00004 10.6667H8.00671M14.6667 8.00001C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00001C1.33337 4.31811 4.31814 1.33334 8.00004 1.33334C11.6819 1.33334 14.6667 4.31811 14.6667 8.00001Z" stroke="#F04438" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </SvgIcon>
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
                    <SvgIcon>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_46_129)">
                          <path d="M6.06004 6C6.21678 5.55444 6.52614 5.17873 6.93334 4.93942C7.34055 4.7001 7.8193 4.61262 8.28483 4.69247C8.75035 4.77232 9.17259 5.01434 9.47676 5.37568C9.78093 5.73702 9.94741 6.19434 9.94671 6.66666C9.94671 8 7.94671 8.66666 7.94671 8.66666M8.00004 11.3333H8.00671M14.6667 8C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8C1.33337 4.3181 4.31814 1.33333 8.00004 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_46_129">
                            <rect width="16" height="16" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </SvgIcon>
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
                            <SvgIcon>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_46_129)">
                                    <path d="M6.06004 6C6.21678 5.55444 6.52614 5.17873 6.93334 4.93942C7.34055 4.7001 7.8193 4.61262 8.28483 4.69247C8.75035 4.77232 9.17259 5.01434 9.47676 5.37568C9.78093 5.73702 9.94741 6.19434 9.94671 6.66666C9.94671 8 7.94671 8.66666 7.94671 8.66666M8.00004 11.3333H8.00671M14.6667 8C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8C1.33337 4.3181 4.31814 1.33333 8.00004 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_46_129">
                                        <rect width="16" height="16" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            </SvgIcon>
                            </IconButton>
                            <Divider orientation="vertical" flexItem />
                            <StyledButton startIcon={<ContentCopyIcon />}>
                                COPY
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

