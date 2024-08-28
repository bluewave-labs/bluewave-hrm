import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
  },
});

const predefinedColors = [
  '#7F56D9', 
  '#9E77ED', 
  '#B692F6', 
  '#D6BBFB', 
  '#E9D7FE', 
  '#EAECF0'  
];

const renderLabelList = (data) => {
  return data.map((entry, index) => (
    <Box 
        key={index} 
        sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '8px' 
            }}>
      <Box 
        sx={{ 
            width: 10, 
            height: 10, 
            backgroundColor: entry.color, 
            borderRadius: '50%', 
            marginRight: '8px' 
            }} />
      <Typography variant="body2">{entry.label}</Typography>
    </Box>
  ));
};

export default function EmployeesRoleGraph() {
  
  const [data, setData] = useState([]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      const employees = response.data;

      const roleCounts = employees.reduce((acc, employee) => {
        acc[employee.role.roleTitle]= (acc[employee.role.roleTitle] || 0) + 1;
        return acc;
      }, {});

      const totalEmployees = employees.length;

      let pieData = Object.keys(roleCounts).map((roleTitle, index) => ({
        id: index,
        label: roleTitle,
        value: (roleCounts[roleTitle] / totalEmployees) * 100,
      }));

      pieData.sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
        

      const top5Data = pieData.slice(0, 5);
      const otherValue = pieData.slice(5).reduce((acc, item) => acc + item.value, 0);

      if (otherValue > 0) {
        top5Data.push({ id: 7, label: 'Other', value: otherValue });
      }

      top5Data.forEach((item, index) => {
        item.color = predefinedColors[index] || '#EAECF0';
      });

      setData(top5Data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <Card
      sx={{
        border: '1px solid #EAECF0',
        borderRadius: '12px',
        boxShadow: 'none',
        width: '360px',
        height: '296px',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
      }}
    >
      <ThemeProvider theme={theme}>
        <Typography variant="h2" className="header">
          Employees by roles
        </Typography>
      </ThemeProvider>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row', 
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            //alignItems: 'center',
          }}
        >

          <PieChart
            series={[
              {
                data: data,
                innerRadius: 44,
                outerRadius: 88,
                cornerRadius: 0,
                startAngle: 0,
                endAngle: 360,
                cx: 85,
                cy: 120,
              },
            ]}
            width={180}
            height={240}
            slotProps={{
              legend: { hidden: true },
            }}
          />
      
        </Box>

        <Box
          sx={{
            marginLeft: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {renderLabelList(data)}
        </Box>
      </Box>
    </Card>
  );
}
