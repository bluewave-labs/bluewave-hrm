import React from 'react';
import './ToolTips.css'
import { styled } from '@mui/material/styles';
import  { tooltipClasses } from '@mui/material/Tooltip';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
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
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
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
      border: '1px solid #dadde9',
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
                            This is a tooltip
                        </React.Fragment>}>
                        <Button>BasicArrowTooltip</Button>
                    </BasicArrowTooltip>
                </Item>
                <Item>
                    <BasicTooltip 
                        title={<React.Fragment>
                        This is a tooltip
                        </React.Fragment>}>
                        <Button>BasicTooltip</Button>
                    </BasicTooltip>
                </Item>
                <Item>
                    <DescriptionArrowTooltip 
                        title={<React.Fragment>
                            <Typography color="inherit">This is a tooltip</Typography>
                            {' '}
                            {"Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."}
                        </React.Fragment>}>
                        <Button>DescriptionArrowTooltip</Button>
                    </DescriptionArrowTooltip>
                </Item>
                <Item>
                    <DescriptionTooltip
                        title={<React.Fragment>
                            <Typography color="inherit">This is a tooltip</Typography>
                            {' '}
                            {"Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."}
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