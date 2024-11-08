import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';

export default function ProfileTabs() {
  // State to track which tab is active
  const [activeTab, setActiveTab] = useState('profile');

  // Function to handle tab selection
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Box>
      {/* Tab section */}
      <Stack direction="row" spacing={4} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Typography
          onClick={() => handleTabClick('profile')}
          sx={{
            paddingBottom: '10px',
            cursor: 'pointer',
            borderBottom: activeTab === 'profile' ? '2px solid #7F56D9' : 'none', // Purple underline for active tab
            color: activeTab === 'profile' ? '#7F56D9' : 'black', // Purple color for active tab text
            fontWeight: activeTab === 'profile' ? 'bold' : 'normal',
          }}
        >
          Profile
        </Typography>
        <Typography
          onClick={() => handleTabClick('password')}
          sx={{
            paddingBottom: '10px',
            cursor: 'pointer',
            borderBottom: activeTab === 'password' ? '2px solid #7F56D9' : 'none', // Purple underline for active tab
            color: activeTab === 'password' ? '#7F56D9' : 'black', // Purple color for active tab text
            fontWeight: activeTab === 'password' ? 'bold' : 'normal',
          }}
        >
          Password
        </Typography>
        <Typography
          onClick={() => handleTabClick('team')}
          sx={{
            paddingBottom: '10px',
            cursor: 'pointer',
            borderBottom: activeTab === 'team' ? '2px solid #7F56D9' : 'none', // Purple underline for active tab
            color: activeTab === 'team' ? '#7F56D9' : 'black', // Purple color for active tab text
            fontWeight: activeTab === 'team' ? 'bold' : 'normal',
          }}
        >
          Team
        </Typography>
      </Stack>
      {/* Content based on the active tab */}
      <Box>
        {activeTab === 'profile'}
        {activeTab === 'password' && <div>Password content goes here...</div>}
        {activeTab === 'team' && <div>Team content goes here...</div>}
      </Box>
    </Box>
  );
}
