import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Select,
    MenuItem,
    Button,
    Typography,
  } from '@mui/material';
const TeamTableComponent = () =>  {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [role, setRole] = useState('');
    const users = [
      { id: 1, name: 'John Connor', email: 'john@domain.com', role: 'Administrator', created: '10/4/2022' },
      { id: 2, name: 'Adam McFadden', email: 'adam@domain.com', role: 'Member', created: '10/4/2022' },
      { id: 3, name: 'Cris Cross', email: 'cris@domain.com', role: 'Member', created: '10/4/2022' },
      { id: 4, name: 'Prince', email: 'prince@domain.com', role: 'Member', created: '10/4/2022' },
    ];
  
    const handleSelectUser = (id) => {
      setSelectedUsers((prevSelected) =>
        prevSelected.includes(id) ? prevSelected.filter((userId) => userId !== id) : [...prevSelected, id]
      );
    };
  
    const handleBulkAction = () => {
      // Implement bulk action logic here
      console.log('Bulk action applied to:', selectedUsers);
    };
  
    const handleRoleChange = (event) => {
      setRole(event.target.value);
      console.log('Change role to:', event.target.value, 'for users:', selectedUsers);
    };
  
    return (
      <div sx={{
        width: '825px',
        height: '475px',
        top: '434px',
        left: '100px',
        radius: '4px',

      }}>
        {/* Action Buttons */}
        <div style={{width: '1050px', height: '31px', top: '19px', left: '0px', radius: '4px', display: 'flex', gap: '10px', marginBottom: '15px',
         }}>
          <Select defaultValue="Bulk actions" variant="outlined" size="small" style={{ minWidth: '150px' }}>
            <MenuItem value="Bulk actions" disabled>
              Bulk actions
            </MenuItem>
            <MenuItem value="Delete">Delete</MenuItem>
            <MenuItem value="Archive">Archive</MenuItem>
          </Select>
          <Button 
          variant="contained" onClick={handleBulkAction} >
            Apply
          </Button>
          <Select value={role} onChange={handleRoleChange} variant="outlined" size="small" style={{ minWidth: '150px' }}>
            <MenuItem value="" disabled>
              Change role to
            </MenuItem>
            <MenuItem value="Administrator">Administrator</MenuItem>
            <MenuItem value="Member">Member</MenuItem>
          </Select>
          <Button variant="contained">Apply</Button>
        </div>
  
        {/* User List */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} selected={selectedUsers.includes(user.id)}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold">
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Created {user.created}
                    </Typography>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

export default TeamTableComponent;
