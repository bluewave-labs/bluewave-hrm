
import React, { useEffect,useState } from 'react';
import { Card, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';

const theme = createTheme({
  typography: {
    h2: {
      fontWeight: 600,
      fontFamily: 'Inter',
      fontSize: '16px',
      color: '#101828',
    },
    body1: {
      fontWeight: 600,
      fontFamily: 'Inter',
      fontSize: '13px',
      color: '#344054',
    },
    body2: {
      fontWeight: 400,
      fontFamily: 'Inter',
      fontSize: '13px',
      color: '#475467',
    },

    body3: {
      fontWeight: 550,
      fontFamily: 'Inter',
      fontSize: '12px',
      color: '#475467',
    },

  },
});


const getAllEmployeesAPI = async ()=> {
  const res = await fetch('http://localhost:5000/api/employees', {
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const result = await res.json();
  return result
}

const xLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function HeadcountChanges() {
  const [headcount,setHeadcount] = useState([])

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const result = await getAllEmployeesAPI();
        return result;
      } catch (error) {
        console.log("Error getting user data for head counts", error);
        return [];
      }
    };

    const fetchEmployees = async () => {
      const result = await getEmployees();
      console.log(result.length)
      const headcount = result.length
      setHeadcount(headcount);
   
    };

    fetchEmployees();
  }, []);


  
const pData = [headcount,34,54,64,54,2,45,67,88,34,28,29];
// const pData = [headcount,headcount,headcount,headcount,headcount,headcount,headcount,headcount,headcount,headcount,headcount,headcount];
  return (

    <Card
      sx={{
        border: '1px solid #EAECF0',
        borderRadius: '12px',
        boxShadow: 'none',
        width: '532px',
        height: '530px',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography variant="h2" className="header" gutterBottom>
            Headcount changes
          </Typography>
    
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <LineChart
              series={[
                {
                  data: pData,
                  showMark: false,
                  color: '#7F56D9',
                },
              ]}
              xAxis={[{ scaleType: 'point', data: xLabels }]}
              yAxis={[{ label: ''}]} 
              width={532}
              height={290}
              grid={{ horizontal: true }}
              leftAxis={{
                disableLine: true,
                disableTicks: true,
                labelStyle: {
                  fontSize: 25,
                  
                },
                tickValues: Array.from({length: 11}, (_, i) => i * 10), 
                tickLabelStyle: {
                  textAnchor: 'end',
                  fontSize: 12,
                  color: '#475467',
                },
              }}
              bottomAxis={{
                disableLine: true,
                disableTicks: true,
                labelStyle: {
                  fontSize: 25,
                  color: '#7F56D9',
                },
                tickLabelStyle: {
                  textAnchor: 'start',
                  fontSize: 12,
                  color: '#475467',
                },
              }}
            />
            <Typography
              variant="body3"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '-60px', 
                transform: 'translateY(-50%) rotate(-90deg)',
               
              }}
            >
              Number of employees
            </Typography>

            <Typography
              variant="body3"
              sx={{
                position: 'absolute',
                bottom: '0%',
                left: '244px', 
                transform: 'translateY(-70%)',
               
              }}
            >
              Months
            </Typography>
          </Box>
        </ThemeProvider>
      </Box>
    </Card>
  );
}
