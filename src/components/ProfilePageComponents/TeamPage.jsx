import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import InviteMemberPopup from './InviteMemberPopup';
import RenameOrganization from './RenameOrganization';
import TeamTableComponent from './TeamTableComponent';

const teamMembers = [
  { name: 'John Connor', email: 'john@domain.com', role: 'Administrator' },
  { name: 'Adam McFadden', email: 'adam@domain.com', role: 'Member' },
  { name: 'Cris Cross', email: 'cris@domain.com', role: 'Member' },
  { name: 'Prince', email: 'prince@domain.com', role: 'Member' },
];

const TeamPage = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(teamMembers);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedTab, setSelectedTab] = useState(2); // Initially "Team"
  const [openDialog, setOpenDialog] = useState(false); // State to control modal visibility

  // Function to open the RenameOrganization dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleOpen = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };
  const handleSelectMember = (name) => {
    setSelectedMembers((prev) =>
      prev.includes(name) ? prev.filter((member) => member !== name) : [...prev, name]
    );
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const applyRoleFilter = () => {
    const filtered = roleFilter
      ? teamMembers.filter((member) => member.role === roleFilter)
      : teamMembers;
    setFilteredMembers(filtered);
  };

  return (
    <Box sx={{ padding: '20px' }}>
       {/* Organization Info */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6"
        sx={{
          width: '192px',
          height: '19px',
          position: 'relative',
        
          fontFamily: 'Inter',
          fontSize: '13px',
          fontWeight: 600,
          lineHeight: '20px',
          textAlign: 'left',
        }}>
          Organization name
          </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle1"
          sx={{
            width: '93px',
            height: '24px',
            fontFamily: 'Inter',
            fontSize: '13px',
            fontWeight: 600,
            lineHeight: '24px',
            
          }}>BlueWave Labs</Typography>
          {/* Edit Icon to open the RenameOrganization modal */}
          <IconButton onClick={handleOpenDialog}>
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          width: '1350px',
          height: '1px',
          top: '300px',
          left: '332px',
          border: '1px 0px 0px 0px',
          backgroundColor: '#e0e0e0',
          marginTop: '16px',
          marginBottom: '16px',
          opacity: '0px',
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }}>
    <Typography
      variant="h5"
      sx={{
        width: 'auto',
        height: '20px',
        position: 'relative',
        width: '192px',
        height: '19px',
        position: 'relative',
          fontFamily: 'Inter',
          fontSize: '13px',
          fontWeight: 600,
          lineHeight: '20px',
          textAlign: 'left',
      }}
    >
      Team Members
    </Typography>
  </Box>

      {/* Button Container */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: 2 }}>
        {/* Invite Member Button */}
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            boxSizing: 'border-box',
            display: 'flex',
            width: '162px',
            height: '34px',
            position: 'absolute',
            
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 16px',
        
            backgroundColor: '#7F56D9',
            border: '1px solid #7F56D9',
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
            borderRadius: '4px',
            color: 'white',
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
          Invite Member
        </Button>{/* Invite Member Popup */}
        <InviteMemberPopup open={openPopup} onClose={handleClose} />
        <TeamTableComponent></TeamTableComponent>


      {/* Save Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
    </Box>
  );
};

export default TeamPage;
