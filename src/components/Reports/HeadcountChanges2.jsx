
import React, { useEffect,useState } from 'react';
import { Card, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';

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


// const getAllEmployeesAPI = async ()=> {
//   const res = await fetch('http://localhost:5000/api/employees', {
//     method:'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   });
//   const result = await res.json();
//   return result
// }

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
  const [cumulativeHireStats, setCumulativeHireStats] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees'); // Adjust the endpoint as needed
        const employeeData = response.data;

        // Initialize counts array
        const counts = Array(12).fill(0);

        // Process data to count employees by month
        employeeData.forEach(emp => {
          const hireDate = new Date(emp.hireDate);
          const month = hireDate.getMonth(); // Months are 0-based in JS
          counts[month] += 1;
        });

        // Calculate cumulative counts
        const cumulativeCounts = counts.reduce((acc, count, index) => {
          if (index === 0) {
            acc[index] = count;
          } else {
            acc[index] = acc[index - 1] + count;
          }
          return acc;
        }, []);

        setCumulativeHireStats(cumulativeCounts);
        console.log("cumulative",cumulativeCounts)
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);


  
const pData = cumulativeHireStats
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
        mb:"42px"
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
              width={500}
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
