import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import {  IconButton, SvgIcon, FormControl } from '@mui/material';
import './TextFields.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Tag = ({ children, className }) => (
  <div className={`tag ${className}`}>
    {children}
    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b95233478407ff1912bdb0c380937bda168175c786f6bbdbad50cc29c870547?apiKey=0cda241451214d81a23fb542618f5274&" alt="Tag icon" className="tag-icon" />
  </div>
);

const tags = [
  { label: 'Design', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7b95233478407ff1912bdb0c380937bda168175c786f6bbdbad50cc29c870547?apiKey=0cda241451214d81a23fb542618f5274&' },
  { label: 'Software', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7b95233478407ff1912bdb0c380937bda168175c786f6bbdbad50cc29c870547?apiKey=0cda241451214d81a23fb542618f5274&' },
];



export const TextFields = () => {
  return (
    <Box >
      <Grid container spacing={2} columns={16}>
        <Grid xs={8} >
        {/*Website with copy button */}
        <div className="container">
        <h2 className="header">Website</h2> 
                
                                       
            <TextField 
              id="internet-speed"
              InputProps={{ 
                endAdornment:  
                  <InputAdornment disableTypography position="end"> 
                    <IconButton>
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
                    <Button  startIcon={<ContentCopyIcon />}>
                      COPY
                    </Button>
                  </InputAdornment>, 
              }}        
            />  
            <p className="hint">This is a hint text to help user.</p>
                             
        </div>

        {/*Website*/}
        <div className='container' >
          <FormControl >                        
            <h2 className="header">Website</h2>                            
            <TextField 
              id="internet-speed"
              InputProps={{ 
                startAdornment:
                  <InputAdornment disableTypography position="end"> 
                    http://
                  </InputAdornment>, 

                endAdornment:  
                  <InputAdornment disableTypography position="end"> 
                    <IconButton>
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
          </FormControl>
        </div>

        {/*Email  */}
        <div className="container">
          <h2 className="header">Email</h2>
          
          <TextField 
              id="internet-speed"
              placeholder='olivia@untitledui.com'   
          /> 
          <p className="hint">This is a hint text to help user.</p>
        </div>     
         
        {/*Email with error */}
        <div className="container" >
          <h2 className="header">Email</h2>  
          <TextField              
            id="internet-speed"
            placeholder='olivia@untitledui.com'
            color='warning'
            InputProps={{ 
              endAdornment:  
              <InputAdornment disableTypography position="end"> 
                <IconButton>
                  <SvgIcon>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.00004 5.33334V8.00001M8.00004 10.6667H8.00671M14.6667 8.00001C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00001C1.33337 4.31811 4.31814 1.33334 8.00004 1.33334C11.6819 1.33334 14.6667 4.31811 14.6667 8.00001Z" stroke="#F04438" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </SvgIcon>
                </IconButton>
              </InputAdornment>, 
            }} 
          /> 
          <p className="hint-description-error">This is an error message.</p>
        </div>

        {/*Email with help icon  */}
        <div className="container">                    
          <h2 className="header">Email</h2>
          <FormControl sx={{ width: '320px', height: '34px', color:'red' }}>
           <TextField 
              id="internet-speed"
              placeholder='olivia@untitledui.com'
              InputProps={{                             
                endAdornment:  
                <InputAdornment disableTypography position="end"> 
                  <IconButton>
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
          </FormControl>                    
        </div>


        </Grid>

        <Grid xs={8}>
          <div className="container">
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
      
          <div className="container">
            <h2 className="header">Description</h2>
            <div className="card">
              <div className="tags-container">
                {tags.map((tag, index) => (
                  <Tag key={index} className="tag">
                    {tag.label}
                  </Tag>
                ))}
              </div>
              <textarea
              id="description"
              className="description-input"
              placeholder="Enter a description..."
              aria-label="Enter a description"
              ></textarea>
            </div>
            <p className="hint">This is a hint text to help user.</p>
          </div>

          <div className="container">
            <h2 className="header">Description</h2>
            <div className="card-error">
              <textarea
              id="description"
              className="description-input"
              placeholder="Enter a description..."
              aria-label="Enter a description"
              ></textarea>
            </div>
            <p className="hint-description-error">This is an error message.</p>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

