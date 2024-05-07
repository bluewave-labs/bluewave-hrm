import React from 'react'
import ProgressStep from './Components/ProgressSteps'
import SideBar from './Components/SideBar'
import Announcement from './Components/Announcement'
import AnnouncementSubscribe from './Components/AnnouncementSubscribe'

import FileUploadDialog from './Components/FileUploadDialog'
import PopupMessage from './Components/PopupMessage'


const App = () => {
  return (
    <div style={{border: '2px solid blue', display: 'flex', justifyContent: 'center'}}>
    <div style={{ border: '1px solid red', maxWidth: '1600px', width: '100vw' }}>
      <ProgressStep/>
      <SideBar/>
      <Announcement/>
      <AnnouncementSubscribe/>
      <FileUploadDialog/>
      <PopupMessage/>
   
   
    </div>
    </div>

  )
}

export default App