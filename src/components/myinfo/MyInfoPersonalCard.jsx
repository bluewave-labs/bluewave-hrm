import { Avatar, Box, Card, CardContent, Paper, Stack, Typography  } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import MyInfoTab from './MyInfoTab';
import MyInfoPersonal from './MyInfoPersonal';
import MyInfoJob from './MyInfoJob';
import { styled } from '@mui/material/styles';
import { colors } from '../../Styles';
import avtarimg from '../../Images/avatar_image.jpg'
import MyinfoDocument from './MyinfoDocument';
import MyinfoJourney from './MyinfoJourney';


const theme = createTheme({
  typography: {

    h2: {
      fontWeight: 600,
      fontFamily:'Inter',
      fontSize: '16px',
      color: '#344054',
      marginTop:'55px',
      marginBottom:'13px',
    },
   
    body1: {
      fontWeight: 600,
      fontFamily:'Inter',
      fontSize: '13px',
      color: '#344054',
    },

    body2: {
      fontWeight: 400,
      fontFamily:'Inter',
      fontSize: '13px',
      color: '#344054',
    },
   
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F8F9F8',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  boxShadow: 'none',
  minWidth: '120px',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '55px',
}));

function formatPhoneNumber(phoneNumber) {
  
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
 
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `${match[1]}-${match[2]}${match[3]}`;
  }
  return phoneNumber;
}

function MyInfoPersonalCard() {
  const tabItems = [
    {
      label: 'Personal',
      child: (
        <div>
          {/* <MyInfoPersonal key={employee.empId} employee={employee} /> */}
        </div>
      ),
    },
    {
      label: 'Job',
      child: (
        <div>
          {/* <MyInfoJob key={employee.empId} employee={employee} /> */}
        </div>
      ),
    },
    {
      label: 'Documents',
      child: <MyinfoDocument/>
    },
    {
      label: 'Journey',
      child: <MyinfoJourney/>
    },
  ];

  return (
    <Card
      sx={{
        border: '1px solid #EBEBEB',
        borderRadius: '10px',
        boxShadow: 'none',
        height: '959px',
        overflowX: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '980px', 
          overflowX: 'auto', 
        }}
      >
        <ThemeProvider theme={theme}>
        <Stack
          sx={{
            height: '153px',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '55px',
            paddingRight: '55px',
            background: colors.darkGrey2,
            borderBottom: 1,
            borderColor: '#D0D5DD',
            flexWrap: 'nowrap',
          }}
          direction="row"
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Avatar
            alt="de"
            src={avtarimg}
            sx={{
              width: '100px',
              height: '100px',
            }}
          />
          <Item
            sx={{
              height: '44px',
            }}
          >
            <Typography variant="body1" className="header">
              Role
            </Typography>
            <Typography variant="body2" className="data">
              Marketing Manager
            </Typography>
          </Item>
          <Item
            sx={{
              height: '44px',
            }}
          >
            <Typography variant="body1" className="header">
              E-mail
            </Typography>
            <Typography variant="body2" className="data">
              natalie@bluewavelabs.ca
            </Typography>
          </Item>
          <Item
            sx={{
              height: '44px',
            }}
          >
            <Typography variant="body1" className="header">
              Phone
            </Typography>
            <Typography variant="body2" className="data">
              415-682-3433
            </Typography>
          </Item>
          <Item
            sx={{
              height: '44px',
            }}
          >
            <Typography variant="body1" className="header">
              Reporting to
            </Typography>
            <Typography variant="body2" className="data">
              Mark Hammer
            </Typography>
          </Item>
        </Stack>
        </ThemeProvider>
        <StyledCardContent>
          <MyInfoTab items={tabItems} />
        </StyledCardContent>
      </Box>
    </Card>
  );
}

MyInfoPersonalCard.propTypes = {};

export default MyInfoPersonalCard;
