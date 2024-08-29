import {  Box, Card, CardContent,   } from '@mui/material';
// import { createTheme} from '@mui/material/styles';
import React from 'react';
import { styled } from '@mui/material/styles';
// import { colors } from '../../Styles';
import EmployeesLocationGraph from './EmployeesLocationGraph';
import EmployeesNationalityGraph from './EmployeesNationalityGraph';

// import Test from './test';
import EmployeesDepartmentGraph from './EmployeesDepartmentGraph';
import HeadcountChanges from './HeadcountChanges';


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
  padding: '55px',
}));



function ReportsMainCard({ employee }) {
  

  return (
    <Card
      sx={{
        border: '1px solid #EBEBEB',
        borderRadius: '5px',
        boxShadow: 'none',
        
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
        {/* <ThemeProvider theme={theme}>
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
          
          <Item
            sx={{
              height: '44px',
            }}
          >
            <Typography variant="body1" className="header">
              Role
            </Typography>
            <Typography variant="body2" className="data">
             xxxxx
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
              xxxxx
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
              xxxxx
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
              xxxxxxx
            </Typography>
          </Item>
        </Stack>
        </ThemeProvider> */}
        <StyledCardContent>
         <EmployeesLocationGraph/>
         <EmployeesDepartmentGraph/>
         <EmployeesNationalityGraph/>
         <HeadcountChanges/>
         {/* <Test/> */}
        </StyledCardContent>
      </Box>
    </Card>
  );
}

ReportsMainCard.propTypes = {};

export default ReportsMainCard;
