import { Box, Grid, TextField, Button, Tabs, Tab, Typography } from "@mui/material";
import Header from "../components/StaticComponents/Header";
import SideMenu from "../components/StaticComponents/SideMenu";
import ProfilePictureUpload from "../components/ProfilePageComponents/ProfilePictureUpload";
import ProfilePagePassword from "../components/ProfilePageComponents/ProfilePagePassword";
import TeamPage from "../components/ProfilePageComponents/TeamPage";
import { useState } from "react";

export default function ProfilePages() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const displayMenu = (menuItem) => {
    console.log("Menu item selected:", menuItem);
  };

  return (
    <Box
      sx={{
        display: "flex", // Flex container for Sidebar and Main Content
        height: "100vh", // Full height of the viewport
        backgroundColor: "#FCFCFD", // Light ash background color
      }}
    >
      {/* Header */}
      <Header />
      {/* Sidebar */}
      <Box sx={{ width: "250px", flexShrink: 0 }}> {/* Sidebar width */}
        <SideMenu onSelect={(menuItem) => displayMenu(menuItem)} />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          padding: "32px 32px", // Horizontal padding
          paddingTop: "64px", // Spacing from the header
          marginLeft: "100px", // Position main content 250px from the left
          marginRight: "100px",
        }}
      >

<Grid container spacing={3} sx={{ marginTop: "64px" }}>
          {/* Tabs (Profile, Password, Team) */}
          <Grid item xs={12}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{
    '& .MuiTabs-indicator': {
      backgroundColor: '#7F56D9', 
    },
    '& .MuiTab-root': {
      color: 'black', 
    },
    '& .Mui-selected': {
      color: '#7F56D9',
    },
    '& .MuiTabs-flexContainer': {
        borderBottom: '1px solid #ccc',
      },  
  }}>
  
              <Tab label={<Typography variant="h6" component="h2" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px', lineHeight: '20px', paragraphSpacing: '14px' }}>profile</Typography>} />
              <Tab label={<Typography variant="h6" component="h2" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px', lineHeight: '20px', paragraphSpacing: '14px' }}>password</Typography>} />
              <Tab label={<Typography variant="h6" component="h2" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px', lineHeight: '20px', paragraphSpacing: '14px' }}>team</Typography>} />
            </Tabs>
          </Grid>

          {/* Main Content Section */}
          <Grid item xs={12}>
            {activeTab === 0 && (
              <Box mt={3}>
                <Grid container spacing={2} justifyContent="flex-start">
                <Grid item container direction="row" alignItems="center">
    <Grid item xs={4}>
      <Typography variant="h6" component="h2" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', lineHeight: '20px', paragraphSpacing: '14px' }}>
        First Name
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <TextField label="" variant="outlined" fullWidth />
    </Grid>
  </Grid>
  <Grid item container direction="row" alignItems="center">
    <Grid item xs={4}>
      <Typography variant="h6" component="h2" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', lineHeight: '20px', paragraphSpacing: '14px' }}>
        Last Name
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <TextField label="" variant="outlined" fullWidth />
    </Grid>
  </Grid>
  <Grid item container direction="row" alignItems="center">
    <Grid item xs={4}>
      <Typography variant="h6" component="h2" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', lineHeight: '20px', paragraphSpacing: '14px' }}>
        Email
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
      <TextField label="" variant="outlined" fullWidth />
    </Grid>
  </Grid>
  </Grid>

                {/* Profile Picture Upload */}
                <Box mt={3}>
                  <Typography variant="body2" color="textSecondary">
                  </Typography>
                  <ProfilePictureUpload />
                </Box>
                <Box>
                  
                  </Box>

              </Box>
            )}

            {activeTab === 1 && <ProfilePagePassword></ProfilePagePassword>}
            {activeTab === 2 && <TeamPage></TeamPage>}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
