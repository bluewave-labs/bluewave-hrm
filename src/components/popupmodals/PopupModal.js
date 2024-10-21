import React from 'react'
import './PopupModal.css'
import CloseIcon from '@mui/icons-material/Close';
import HRMButton from '../Button/HRMButton';





function PopupModals() {
  return (
    <div className='PopupModals'>
        <div className='unsavedPopupBody'>
            
                <label className='modal-header-h2'> Unsaved Changes</label>
                <p className='modal-header-p'>Do you want to save or discard changes?</p>
            
            <div className='btngroup1'>
                <label className='discardLabel'>Discard</label>
                <HRMButton mode={'primary'}>Save changes</HRMButton>
            </div>
        </div>
        <div className='createNewDepartmentPopupBody'>
            <header className='modal-header'>
                <div className='modal-header-title'>
                    <label>Create new departman</label>
                </div>
                <CloseIcon color='action'></CloseIcon>
            </header>
            <main className='modal-content'>
                <div><label htmlFor="departman-name" className='labelname'>Name</label></div><br/>
                <div><input type="text" id="departman-name"  className='inputname' placeholder='Human Resource' aria-label='Departman Name'></input></div>
            </main>
            <div className='createbtngroup'>
                <HRMButton mode={'secondaryB'}>Cancel</HRMButton>
                <HRMButton mode={'primary'}>Save</HRMButton>
            </div>
        </div>

    </div>
    
  )
}



export default PopupModals

