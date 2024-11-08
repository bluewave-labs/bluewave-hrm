import React from 'react';
import './ToolTips.css'
import { styled } from '@mui/material/styles';
import  { tooltipClasses } from '@mui/material/Tooltip';
import Tooltip from '@mui/material/Tooltip';
import { Box, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const BasicArrowTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} placement='left'/>
    ))
    (({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.common.black,
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.black,
            color:'',
            maxWidth:110,
            height:34,
            fontSize: theme.typography.pxToRem(12),
        }
}))

const BasicTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement='top' />
  ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      color: '',
      maxWidth: 110,
      height: 34,
      fontSize: theme.typography.pxToRem(12),
      
    },
}));

const DescriptionArrowTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} placement='top-start'/>
  ))
  (({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
      
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      color: '',
      maxWidth: 280,
      fontSize: theme.typography.pxToRem(12),
      
    },
}));

const DescriptionTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement='top' />
  ))(({ theme }) => ({
    
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      color: '',
      maxWidth: 280,
      fontSize: theme.typography.pxToRem(12),
    
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
  }));

const ToolTips = () => {
  return (
    <div className='ToolTips'>
        <Box height={439}
        width={519}
        my={4}
        display="flex"
        alignItems="center"
        justifySelf={"center"}
        gap={4}
        p={2}
        sx={{ border: 'none' }}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                <Item>
                    <BasicArrowTooltip 
                        title={<React.Fragment>
                            <p className='tooltiptext'>This is a tooltip</p>
                        </React.Fragment>}>
                        <Button>BasicArrowTooltip</Button>
                    </BasicArrowTooltip>
                </Item>
                <Item>
                    <BasicTooltip 
                        title={<React.Fragment>
                        <p className='tooltiptext'>This is a tooltip</p>
                        </React.Fragment>}>
                        <Button>BasicTooltip</Button>
                    </BasicTooltip>
                </Item>
                <Item>
                    <DescriptionArrowTooltip 
                        title={<React.Fragment>
                            <p className='text'>This is a tooltip</p>
                            <p className='description'>Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text.</p>
                        </React.Fragment>}>
                        <Button>DescriptionArrowTooltip</Button>
                    </DescriptionArrowTooltip>
                </Item>
                <Item>
                    <DescriptionTooltip
                        title={<React.Fragment>
                            <p className='text'>This is a tooltip</p>
                            <p className='description'>Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text.</p>
                        </React.Fragment>}>
                        <Button>DescriptionTooltip</Button>
                    </DescriptionTooltip>
            </Item>
        </Stack>
        </Box>
    </div>
  )
}

export default ToolTips