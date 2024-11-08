import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Grid } from '@mui/material';

function ProfilePagePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const validatePassword = (password) => {
    const hasNumber = /\d/;
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < 8 || !hasNumber.test(password) || !hasSymbol.test(password)) {
      setError(
        'New password must contain at least 8 characters and must have at least one number and one symbol.'
      );
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!error && newPassword === confirmPassword) {
      try {
        const response = await fetch('https://your-api-url.com/update-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        });

        if (response.ok) {
          setSuccess('Password changed successfully');
          setError('');
          // Optionally, clear the fields
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          const data = await response.json();
          setError(data.message || 'An error occurred while updating the password.');
          setSuccess('');
        }
      } catch (error) {
        setError('Network error. Please try again later.');
        setSuccess('');
      }
    } else {
      setError('Password mismatch or validation error.');
      setSuccess('');
    }
  };

  return (
    <Box mt={3}>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="flex-start">
                <Grid item container direction="row" alignItems="center">
    <Grid item xs={4}>
      <Typography variant="h6" component="h2" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', lineHeight: '20px', paragraphSpacing: '14px' }}>
        Current Password
      </Typography>
    </Grid>
    <Grid item xs={8}>
    <TextField
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              sx={{
                width: '452px',
                height: '30px',
                padding: '10px 0 0 14px',
                gap: '8px',
                borderRadius: '4px 0 0 0',
                borderTop: '1px solid #ccc',
                opacity: 1, // Makes the field invisible; adjust if semi-transparent is desired
                '& .MuiInputBase-root': {
                  padding: '0',
                },
                '& .MuiInputBase-input': {
                  padding: '0',
                  height: '100%',
                },
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
    </Grid>
  </Grid>
  <Grid item container direction="row" alignItems="center">
    <Grid item xs={4}>
      <Typography variant="h6" component="h2" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', lineHeight: '20px', paragraphSpacing: '14px' }}>
        New Password
      </Typography>
    </Grid>
    <Grid item xs={8}>
    <TextField
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              sx={{
                width: '452px',
                height: '30px',
                padding: '10px 0 0 14px',
                gap: '8px',
                borderRadius: '4px 0 0 0',
                borderTop: '1px solid #ccc',
                opacity: 1, // Makes the field invisible; adjust if semi-transparent is desired
                '& .MuiInputBase-root': {
                  padding: '0',
                },
                '& .MuiInputBase-input': {
                  padding: '0',
                  height: '100%',
                },
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
    </Grid>
  </Grid>
  <Grid item container direction="row" alignItems="center">
    <Grid item xs={4}>
      <Typography variant="h6" component="h2" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', lineHeight: '20px', paragraphSpacing: '14px' }}>
        Confirm New Password
      </Typography>
      <Typography sx={{ color: '#667085' }} style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '13px',
            lineHeight: '20px',
          }}>
          After updating you will receive a confirmation email
</Typography>
    </Grid>
    <Grid item xs={8}>
    <TextField
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                width: '452px',
                height: '30px',
                padding: '10px 0 0 14px',
                gap: '8px',
                borderRadius: '4px 0 0 0',
                borderTop: '1px solid #ccc',
                opacity: 1, // Makes the field invisible; adjust if semi-transparent is desired
                '& .MuiInputBase-root': {
                  padding: '0',
                },
                '& .MuiInputBase-input': {
                  padding: '0',
                  height: '100%',
                },
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
    </Grid>
  </Grid>
  </Grid>
        {/* Error Alert */}
        {error && (
          <Alert severity="warning" sx={{ marginTop: '20px', width: '68%', align: 'center' }}>
            {error}
          </Alert>
        )}

        {/* Success Alert */}
        {success && (
          <Alert severity="success" sx={{ marginTop: '20px', width: '68%' }}>
            {success}
          </Alert>
        )}

        {/* Save Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '400px',
            marginRight: '450px'
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#7F56D9',
              color: 'white',
              width: '120px',
              '&:hover': {
              backgroundColor: '#6B47C4', // Darker shade on hover
              borderColor: '#6B47C4',
            },
            '&:active': {
              backgroundColor: '#5B3F99', // Darker shade when active
              borderColor: '#5B3F99',
            },
            transition: 'background 0.3s ease, border-color 0.3s ease',
            }}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ProfilePagePassword;
