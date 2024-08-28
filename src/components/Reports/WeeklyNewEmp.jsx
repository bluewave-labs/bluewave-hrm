import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { width } from '@mui/system';
import { Button, Card } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Select, MenuItem } from '@mui/material';
// import CheckIcon from '@mui/icons-material/Check';
import { Typography, Box } from '@mui/material';

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

export default function WeeklyNewEmployeesChart() {
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
        // height: '530px',   
        height: '296px',      
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        mb:"42px"
      }}
      

    >  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h3>Headcount Changes</h3>
    <div style={{ position: 'relative' }}>
   

   
        <Select
      id="dateSelector"
      value={JSON.stringify(selectedDate)}
      onChange={handleSelectChange}
      displayEmpty
      IconComponent={() => null}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarTodayOutlinedIcon sx={{ marginRight: '8px' }} />  {/* Custom icon on the left */}
          <Typography>
            {generateOptions().find(option => JSON.stringify(option.value) === selected)?.label || 'Select a date'}
          </Typography>
        </Box>
      )}
    
      sx={{
        padding: '5px',
        borderRadius: '3px',
        margin: '5px',
        display: 'block',
        borderRadius:"8px",
        width: '100%', // Make dropdown same width as button
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: 200,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#EAECF0',
              borderRadius: '4px',
            },
          },
        },
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
    
    </div>
  </div>

  <BarChart
    dataset={hireStats}
    xAxis={[
      { scaleType: 'band', dataKey: 'week' },
    ]}
    {...chartSetting}
  /></Card>

    

  );
}
