import React from 'react'
import './Logos.css'

const hr_logo = require('./hr_logo.png');
const onboard_logo = require('./onboard_logo.png');

const Logos = () => {
  return (
    <div className='Logos'>
      <div className="views-card">
        <div className="views-card-header">
          <h2 className="views-title">BlueWave Onboard logo</h2>
        </div>
        <div className='onboard'><img src={onboard_logo} alt="BlueWave Onboard logo" width="191.93" height="111"/></div>

      </div>

      <div className="views-card">
        <div className="views-card-header">
          <h2 className="views-title">BlueWave HR logo</h2>
          
        </div>
        <div><img src={hr_logo} alt="BlueWave HR logo" width="147" height="109.4" /></div>
     

      </div>

    </div>
  )
}

export default Logos
