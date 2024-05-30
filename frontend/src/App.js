import React from 'react'
import CustomizedSteppers from './Components/CustomizedSteppers'
import SideBar from './Components/SideBar'
import Announcement from './Components/Announcement'
import AnnouncementSubscribe from './Components/AnnouncementSubscribe'
import FileUploadDialog from './Components/FileUploadDialog'
import PopupMessage from './Components/PopupMessage'
import PopupMessageSM from './Components/PopupMessageSM'

const steps = [
  {
    label: 'Your details',
    description: `Please provide your name and email`,
  },
  {
    label: 'Company details',
    description:
      'A few details about your company',
  },
  {
    label: 'Invite your team',
    description: `Start collaborating with your team`,
  },
];

const App = () => {
  return (
    <div style={{border: '2px solid blue', display: 'flex', justifyContent: 'center'}}>
    <div style={{ border: '1px solid red', maxWidth: '1600px', width: '100vw' }}>
      <CustomizedSteppers stepnumber={1} steps={steps} />
      <SideBar/>
      <Announcement/>
      <AnnouncementSubscribe/>
      <FileUploadDialog/>
      <PopupMessage/>
      <PopupMessageSM/>
   
   
    </div>
    </div>

  )
}

export default App