import React from 'react';
import './Charts.css';
import { SvgIcon } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { LineChart, areaElementClasses } from '@mui/x-charts/LineChart';
import { useYScale, useDrawingArea } from '@mui/x-charts/hooks';
import { green } from '@mui/material/colors';

const data = [0, 40, 30, 10, 50, 70, 25, 90];
const xData = [0, 1, 2, 3, 4, 5, 6, 7];

function ColorPalette({ id }) {
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;
  const scale = useYScale(); // You can provide the axis Id if you have multiple ones

  return (
    <defs>
      <linearGradient
        id={id}
        x1="0"
        x2="0"
        y1="0"
        y2={`${svgHeight}px`}
        gradientUnits="userSpaceOnUse" // Use the SVG coordinate instead of the component ones.
      >
        <stop offset={scale(100) / svgHeight} stopColor={green[400]} stopOpacity={1} />
        <stop offset={scale(0) / svgHeight} stopColor={green[50]} stopOpacity={1} />
      </linearGradient>
    </defs>
  );
}

function ViewsCard({viewsCount, percentChange}) {
  
  return (
   
      <div className="views-card">
        <div className="views-card-header">
          <SvgIcon className='views-card_featuredicon'>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#DCFAE6"/>
              <path d="M34 19L26.1314 26.8686C25.7354 27.2646 25.5373 27.4627 25.309 27.5368C25.1082 27.6021 24.8918 27.6021 24.691 27.5368C24.4627 27.4627 24.2646 27.2646 23.8686 26.8686L21.1314 24.1314C20.7354 23.7354 20.5373 23.5373 20.309 23.4632C20.1082 23.3979 19.8918 23.3979 19.691 23.4632C19.4627 23.5373 19.2646 23.7354 18.8686 24.1314L14 29M34 19H27M34 19V26" stroke="#079455" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </SvgIcon>
          <MoreVertIcon className="views-card__more-icon"color='action'></MoreVertIcon>
        </div>
        <div className="views-card_subtitle">
          Views 24 hours
        </div>
        <div className="views-card_content">
          <div className="views-card_count">{viewsCount}</div>
          <div className="views-card_percent-change">
            <ArrowUpwardIcon className="views-card__percent-icon" color='success'/>
            <div className="views-card__percent-value">{percentChange}%</div>
          </div>
          
        </div>
        
      </div>
      
    
  )
}

function ViewsCardCharts() {
  const viewsData = [
    {
      count: "2,000",
      percentage: "100%",
      label: "vs last month",
      
    },
  ];
  return (
    
      

      <div className="views-card-chart">
        <div className="views-card-header-chart">
          <h2 className="views-title">Views 24 hours</h2>
          <MoreVertIcon className="views-card__more-icon"color='action'></MoreVertIcon>
        </div>
        <div className="views-card_contentchart">
          {viewsData.map((view, index) => (
            <div key={index} className="view-item">
              <div className="view-details">
                <div className="view-count">{view.count}</div>
                <div className="view-comparison">
                  <div className="view-percentage">
                    <ArrowUpwardIcon className="views-card__percent-icon" color='success'/>
                    <span className="percentage-value">{view.percentage}</span>
                  </div>
                  <div className="view-label">{view.label}</div>
                </div>
              
              </div>
              <LineChart
                leftAxis={null}
                bottomAxis={null}
                xAxis={[{ data: xData}]}
                yAxis={[{ min: 0, max: 100 }]}
                series={[{ curve: 'linear', data, showMark: false, area: true, color: '#59a14f' }]}
                width={400}
                height={150}
                margin={{ top: 5, bottom: 22, left: 125 }}
                sx={{
                  [`& .${areaElementClasses.root}`]: {
                    fill: 'url(#swich-color-id-2)',
                  },
                }}
              >
                <ColorPalette id="swich-color-id-2" />
              </LineChart>
            </div>       
          ))}
        </div>

      </div>
      
      
  )
}

function Charts() {
  return (
    // <Grid container justifyContent="space-around" alignItems="center">
    //   <Grid item  xs={6}>
    //     <ViewsCard viewsCount="2,000" percentChange="100" />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <ViewsCardCharts/>
    //   </Grid>
    // </Grid>

    <div className="flex-container">
      <div><ViewsCard viewsCount="2,000" percentChange="100" /></div>
      <div><ViewsCardCharts/></div>

    </div>
    
  )
}

export default Charts;