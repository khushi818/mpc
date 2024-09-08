import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import instance from '../constant/instance';

const RoleAssign = () => {
    const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]);
  
  const getAllUsers = async () =>{
    try{
        const {data} = await instance.get('/auth/allUsers')
        setUsers([...data.data.allUsers])
    }
    catch(err) {
        console.log(err)
    }
  }

  const handleAddUser = async(e) => {
    e.preventDefault();
    const { data } = await instance.post('/auth/create-role' ,{ firstName, lastName , email, password , role})
    
    if(data.success){
        getAllUsers()
    setEmail('');
    setPassword('');
    setRole('')
    setFirstName('')
    setLastName('')
    }
  };

  useEffect(() =>{
     getAllUsers()        
  },[])

  const handleDeleteUser = async (id) => {
    await instance.delete(`/auth/deleteUser/${id}`)
    getAllUsers()
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Assign Roles
      </Typography>
      
      {/* Form to Add User */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="vice president">Vice President</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add User
        </Button>
      </Box>

      {/* Table to Display Users */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default RoleAssign;
