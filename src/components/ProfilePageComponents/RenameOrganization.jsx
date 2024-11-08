import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

const RenameOrganization = ({onClose}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '439px',
        height: '185px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        borderRadius: '4px',
        p: 3, // Adds padding
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Title */}
      <Typography variant="h6" component="h2" color="text.primary">
        Rename Organization
      </Typography>

      {/* Input for renaming the organization */}
      <TextField
        label="New organization name"
        variant="outlined"
        fullWidth
      />

      {/* Buttons */}
      <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default RenameOrganization;
