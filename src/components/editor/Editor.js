import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    //margin: theme.spacing(0.25),
    marginleft: 2,
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      marginleft: 2,
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginleft: 2,
      borderLeft: 0,
    },
}));

export default function Editor() {
  
  const [formats, setFormats] = React.useState(() => ['italic']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  
  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          width: 320,
          height: 32,
          top: 47,
          paddingleft: 20,
          display: 'flex',
          alignItems: 'center',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"

        >
          <ToggleButton value="bold" aria-label="bold" sx={{width:32, height:32}} >
            <FormatBoldIcon fontSize="small"/>
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic"sx={{width:32, height:32}} >
            <FormatItalicIcon fontSize="small"/>
          </ToggleButton>
          <ToggleButton value="sizemedium" aria-label="sizemedium" sx={{width:32, height:32}} >
            <FormatSizeIcon fontSize='small'/>
          </ToggleButton>
          <ToggleButton value="sizesmall" aria-label="sizesmall" sx={{width:32, height:32}} >
            <FormatSizeIcon fontSize='small'/>
          </ToggleButton>
          <ToggleButton value="quote" aria-label="quote"sx={{width:32, height:32}} >
            <FormatQuoteIcon fontSize="small"/>
          </ToggleButton>
          <ToggleButton value="insertlink" aria-label="insertlink"sx={{width:32, height:32}} >
            <InsertLinkIcon fontSize="small"/>
          </ToggleButton>
          <ToggleButton value="insertphoto" aria-label="insertphoto"sx={{width:32, height:32}} >
            <InsertPhotoIcon fontSize="small"/>
          </ToggleButton>
          <ToggleButton value="listbullet" aria-label="listbullet"sx={{width:32, height:32}} >
            <FormatListBulletedIcon fontSize="small"/>
          </ToggleButton>
          <ToggleButton value="listnumbered" aria-label="listnumbered"sx={{width:32, height:32}} >
            <FormatListNumberedIcon fontSize="small"/>
          </ToggleButton>

          
        </StyledToggleButtonGroup>
      
        
        
      </Paper>
    </div>
  );
}