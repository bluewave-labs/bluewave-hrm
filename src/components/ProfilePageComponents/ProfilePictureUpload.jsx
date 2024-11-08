import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import DeleteAccountModal from './DeleteAccountMondal';

function ProfilePictureUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control modal visibility

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true); // Show modal when delete is clicked
  };

    // Handler to close modal
    const handleCloseModal = () => {
      setShowDeleteModal(false); // Close modal when needed
    };

  return (
    <Box>
      {/* Profile Picture Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '20px 0',
          width: '100%',
        }}
      >
        {/* Left Half: Photo and Description */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <Typography variant="body1" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', lineHeight: '20px', paragraphSpacing: '14px' }}>
              Your photo
            </Typography>
            <Typography variant="body2" sx={{ color: '#667085' }} style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', lineHeight: '20px', paragraphSpacing: '14px' }}>
              This photo will be displayed on your profile page.
            </Typography>
          </Box>
        </Box>

        {/* Right Half: Upload Box and Action Buttons */}
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginTop: '10px',
            }}
          >
            <img
              src={selectedImage || 'your-profile-picture-url'}
              alt="Profile"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <Typography variant="caption" color="textSecondary">
              Resize or crop
            </Typography>
          </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center', // Align items to the center
            gap: 2,
          }}
        >
          {/* Upload Box */}
          <Box
            sx={{
              border: '1px dashed #ccc',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              height: '100px',
              width: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'left',
              gap: '2px',
              flexDirection: 'row',
            }}
          >
            <Button variant="outlined" component="label" sx={{ cursor: 'pointer' }}>
              <input type="file" hidden onChange={handleImageChange} />
              <Typography color="primary">Click to upload</Typography>
            </Button>
            <Typography variant="caption" color="textSecondary">
              or drag and drop <br />
              (max. 800x400px)
            </Typography>
          </Box>

          {/* Delete and Update Links */}
       
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="text" sx={{ color: '#667085' }} >
              Delete
            </Button>
            <Button variant="text" sx={{ color: '#7F56D9'}}>
              Update
            </Button>
          </Box>
        

          {/* Save Button directly underneath Delete and Update */}
          <Box sx={{ width: '100%', marginTop: '0px' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#7F56D9', color: 'white', width: '100%' }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Divider Line */}
      <Box
        sx={{
          width: '100%',
          height: '2px',
          backgroundColor: '#ccc', // Line color
          margin: '5px 0',
        }}
      />

      {/* Delete Account Section */}
      <Box>
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          Delete account
        </Typography>
        <Typography variant="body2" sx={{ color: '#667085', marginBottom: '20px' }}>
          Note that deleting your account will remove all data from our system. This is permanent and non-recoverable.
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: '#DB504A', color: 'white' }} onClick={handleDeleteClick}>
          Delete account
        </Button>
        {showDeleteModal && (
      <DeleteAccountModal />
    )}
      </Box>
    </Box>
  );
}

export default ProfilePictureUpload;
