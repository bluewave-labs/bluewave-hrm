import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const DeleteAccountModal = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '439px',
        height: '203px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        borderRadius: '4px',
        padding: '20px', // Adjust padding as needed
      }}
    >
      {/* Title */}
      <Typography variant="h6" sx={{ marginBottom: '20px' }}>
        Delete Account?
      </Typography>

      {/* Description */}
      <Typography variant="body1" sx={{ marginBottom: '30px' }}>
        Are you sure you want to delete your account? This action is irreversible.
      </Typography>

      {/* Buttons (cancel and confirm) */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Button variant="outlined" color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="error">
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteAccountModal;
