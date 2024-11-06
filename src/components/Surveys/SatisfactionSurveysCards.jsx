import { Box, Card, CardContent, 
  //Paper, 
    // Stack, 
    // Typography  
} from '@mui/material';
import { 
  //createTheme, 
    //ThemeProvider 
} from '@mui/material/styles';
import React from 'react';
import { styled } from '@mui/material/styles';
import SatisfactionSurveysResults from './SatisfactionSurveysResults';
import CustomTabs from '../tabs/CustomTabs';

// const theme = createTheme({
//   typography: {

//     h2: {
//       fontWeight: 600,
//       fontFamily:'Inter',
//       fontSize: '16px',
//       color: '#344054',
//       marginTop:'55px',
//       marginBottom:'13px',
//     },
   
//     body1: {
//       fontWeight: 600,
//       fontFamily:'Inter',
//       fontSize: '13px',
//       color: '#344054',
//     },

//     body2: {
//       fontWeight: 400,
//       fontFamily:'Inter',
//       fontSize: '13px',
//       color: '#344054',
//     },

//     body3: {
//       fontWeight: 400,
//       fontFamily:'Inter',
//       fontSize: '11px',
//       color: '#909090',
//     },
   
//   },
// });

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F8F9F8',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'left',
//   boxShadow: 'none',
//   minWidth: '120px',
// }));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '48px 48px 48px 48px',
  
  
}));

function SatisfactionSurveysCards({ employee }) {
  const tabItems = [
    {
      label: 'Results',
      child: (
        <div>
          <SatisfactionSurveysResults/>
        </div>
      ),
    },
    {
      label: 'Templates',
      child: (
        <div>
          deneme
        </div>
      ),
    },
   
  ];

  return (
    <Card
      sx={{
        border: '1px solid #EBEBEB',
        borderRadius: '5px',
        boxShadow: 'none',
        maxHeight: '659px',
        overflowX: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '952px', 
          overflowX: 'auto', 
        }}
      >
       
        <StyledCardContent>
          <CustomTabs items={tabItems} key={employee.empId} employee={employee} />
        </StyledCardContent>
      </Box>
    </Card>
  );
}

SatisfactionSurveysCards.propTypes = {};

export default SatisfactionSurveysCards;
