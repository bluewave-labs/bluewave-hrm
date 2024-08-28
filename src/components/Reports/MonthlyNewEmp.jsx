import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
// import { dataset } from '../dataset/weather';

// export const dataset = [
//   {
//     heads: 21,
//     month: 'Jan',
//   },
//   {
    
//     heads: 28,
//     month: 'Feb',
//   },
//   {
    
//     heads: 41,
//     month: 'Mar',
//   },
//   {
    
//     heads: 73,
//     month: 'Apr',
//   },
//   {
    
//     heads: 99,
//     month: 'May',
//   },
//   {
    
//     heads: 144,
//     month: 'June',
//   },
//   {
    
//     heads: 319,
//     month: 'July',
//   },
//   {
    
//     heads: 249,
//     month: 'Aug',
//   },
//   {
    
//     heads: 131,
//     month: 'Sept',
//   },
//   {
    
//     heads: 55,
//     month: 'Oct',
//   },
//   {
    
//     heads: 48,
//     month: 'Nov',
//   },
//   {
    
//     heads: 25,
//     month: 'Dec',
//   },
// ];


const valueFormatter = (value) => `${value}mm`;

const chartSetting = {
  yAxis: [
    {
      label: 'Monthly Head Counts',
    },
  ],
  series: [{ dataKey: 'counts', label: 'Monthly New Employees', valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function TickPlacementBars() {
  const [hireStats, setHireStats] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees'); // Adjust the endpoint as needed
        const employeeData = response.data;
        console.log("heelo")
        console.log(employeeData)

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        // Initialize counts array
        const counts = Array(12).fill(0);

        // Process data to count employees by month
        employeeData.forEach(emp => {
          const hireDate = new Date(emp.hireDate);
          const month = hireDate.getMonth(); // Months are 0-based in JS
          counts[month] += 1;
        });

        // Create the new dataset
        const hireStats = counts.map((count, index) => ({
          counts: count,
          month: monthNames[index]
        }));
        console.log(hireStats)
        setHireStats(hireStats);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <div style={{ width: '100%' }}>
    
      <BarChart
        dataset={hireStats}
        xAxis={[
          { scaleType: 'band', dataKey: 'month' },
        ]}
        {...chartSetting}
      />
    </div>
  );
}