import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

const InviteMemberPopup = ({ open, onClose }) => {
  const handleInvite = () => {
    // Logic for inviting a new member goes here
    console.log('Member invited');
    onClose(); // Close the dialog after inviting
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '28px',
              color: '#344054',
              marginBottom: '8px', // Added margin for spacing
            }}
          >
            Invite New Team Member
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '13px',
              lineHeight: '20px',
              color: '#344054',
              marginBottom: '16px', // Added margin for spacing
            }}
          >
            When you add a new team member they will get access to all monitors.
          </Typography>

          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter email address"
            sx={{
              background: '#FFFFFF',
              border: '1px solid #D0D5DD',
              borderRadius: '4px',
              marginBottom: '16px', // Added margin for spacing
            }}
          />
            <Box sx={{
                display: 'flex',
                justifyContent:'flex-end',
            }}>
          <Button
            onClick={handleInvite}
            sx={{
              width: '108px',
              height: '34px',
              background: '#7F56D9',
              border: '1px solid #7F56D9',
              borderRadius: '4px',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#6B47C4',
              },
            }}
          >
            Send Invite
          </Button>
          </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberPopup;
