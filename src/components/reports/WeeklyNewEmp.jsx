import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import {  Card, FormControl, ThemeProvider, createTheme } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Select, MenuItem, InputBase,
  styled } from '@mui/material';
// import CheckIcon from '@mui/icons-material/Check';
import { Typography, Box } from '@mui/material';

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
      fontWeight: 550,
      fontFamily: 'Inter',
      fontSize: '14px',
      color: '#101828',
    },
    body3: {
      fontWeight: 550,
      fontFamily: 'Inter',
      fontSize: '12px',
      color: '#475467',
    },
    body4: {
      fontWeight: 550,
      fontFamily: 'Inter',
      fontSize: '12px',
      color: '#344054',
    },
    body5: {
      fontWeight: 400,
      fontFamily: 'Inter',
      fontSize: '13px',
      color: '#344054',
      marginLeft: '10px',
    },
    body6: {
      fontWeight: 400,
      fontFamily: 'Inter',
      fontSize: '13px',
      color: '#667085',
      marginLeft: '2px',
      padding: '9px, 10px, 9px, 10px',
    },
  },
});

// Custom styling for InputBase component used in the Select component
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  height: '34px',
  marginBottom: '0px',
  marginTop: '0px',
   'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #D0D5DD',
    fontSize: 13,
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: 'Inter',
    '&:focus': {
      borderRadius: 8,
      borderColor: '#D0D5DD',
    },
   
  },
}));

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const generateOptions = () => {
  const options = [];
  for (let year = 2016; year <= 2021; year++) {
    months.forEach((month, index) => {
      options.push({ label: `${month} ${year}`, value: { year, month: index + 1 } });
    });
  }
  return options;
};

const chartSetting = {
  yAxis: [
    {
      label: 'Weekly Head Counts',
      min: 0,
      max: 5,
      ticks: [0, 1, 2],
      tickCount: 3,
      tickFormat: (value) => value,
     
    },
  ],
  series: [{ dataKey: 'counts', color: '#7F56D9' }],
  width:500,
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

function WeeklyNewEmp(props) {
  const [hireStats, setHireStats] = useState([]);
  const [selectedDate, setSelectedDate] = useState({ year: 2016, month: 1 });
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        const employeeData = response.data;
        console.log("Data fetched:", employeeData);

        const weeklyData = getWeeklyNewEmployees(employeeData, selectedDate.year, selectedDate.month);

        console.log("Weekly Stats:", weeklyData);
        setHireStats(weeklyData);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [selectedDate]);

  const getWeeklyNewEmployees = (employees, year, month) => {
    const startOfMonth = new Date(Date.UTC(year, month - 1, 1));
    const endOfMonth = new Date(Date.UTC(year, month, 0));

    const weeks = [];
    let currentDate = new Date(startOfMonth);

    while (currentDate <= endOfMonth) {
      const startOfWeek = new Date(currentDate);
      const endOfWeek = new Date(currentDate);
      endOfWeek.setUTCDate(endOfWeek.getUTCDate() + 6);

      const weeklyCount = employees.filter((employee) => {
        const hireDate = new Date(employee.hireDate);
        return hireDate >= startOfWeek && hireDate <= endOfWeek;
      }).length;

      weeks.push({
        counts: weeklyCount,
        week: startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      });

      currentDate.setUTCDate(currentDate.getUTCDate() + 7);
    }

    return weeks.slice(0, 5);
  };

  const handleSelectChange = (e) => {
    const { year, month } = JSON.parse(e.target.value);
    setSelectedDate({ year, month });
    setShowDropdown(false);
  };

  return (
    <Card
    sx={{
      border: '1px solid #EAECF0',
      borderRadius: '12px',
      boxShadow: 'none',
      width: '532px',
      height: '296px',
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <Typography variant="h2" className="header">
            Headcount Changes
          </Typography>
          <FormControl sx={{ width: '114px' }}>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      backgroundColor: "transparent", 
                    },
                  
                    '&.Mui-focused': {
                            backgroundColor: "transparent !important",
                        },
                    "&.Mui-selected": {
                      backgroundColor: "transparent !important", 
                      "&:hover": {
                        backgroundColor: "transparent !important", 
                      },
                      "&:active": {
                      backgroundColor: "transparent !important", 
                      },
                    },
                  },
               },
              }
            }}
            displayEmpty
            value={JSON.stringify(selectedDate)}
            onChange={handleSelectChange}
            input={<BootstrapInput />}
            IconComponent={() => null}
            renderValue={(selected) => {
              return (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'between-space', 
                width: '100%', 
                flexDirection: 'row',
              }}>
                <CalendarTodayOutlinedIcon sx={{ marginLeft: '10px' }} />  {/* Custom icon on the left */}
                <Typography variant="body5">
                  {generateOptions().find(option => JSON.stringify(option.value) === selected)?.label || 'Select a date'}
                </Typography>
              </Box>
              ) 
            }}
           
          >
            {generateOptions().map(option => (
                <MenuItem
                  key={option.label}
                  value={JSON.stringify(option.value)}
                  sx={{
                    padding: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    '&.Mui-selected': {
                      backgroundColor: '#F9FAFB',
                      borderRadius: '4px',
                    },
                  }}
                >
                  {option.label}

                </MenuItem>
              ))}
          </Select>
    </FormControl>
          
        </Box>
        <Box sx={{ 
          position: 'relative', 
          width: '100%', 
          height: '250px',
          display: 'flex',        
          alignItems: 'center',   
           }}>
        <BarChart
            dataset={hireStats}
            xAxis={[
              { scaleType: 'band', dataKey: 'week' },
            ]}
            {...chartSetting}
            leftAxis={{
              disableLine: true,
              disableTicks: true,
              labelStyle: {
                fontSize: 12,
                color: '#475467',
              },
              tickValues: Array.from({length: 11}, (_, i) => i * 10), 
              tickLabelStyle: {
                textAnchor: 'end',
                fontSize: 12,
                color: '#475467',
              },
            }}
          />
        </Box>
      </ThemeProvider>
    </Box>
  </Card>
  )
}

WeeklyNewEmp.propTypes = {}

export default WeeklyNewEmp
