import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';

const Profile = () => {
  // Simulated user data (replace this with your real data)
  const profileData = sessionStorage.getItem('auth') ?  JSON.parse(sessionStorage.getItem('auth')).user : {}
  const profile = {
    firstName: profileData?.firstName,
    lastName: profileData?.lastName,
    email: profileData?.email,
    role: profileData?.role,
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Profile
      </Typography>

      <Paper elevation={3} sx={{ padding: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">First Name:</Typography>
            <Typography variant="body1">{profile.firstName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Last Name:</Typography>
            <Typography variant="body1">{profile.lastName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Email:</Typography>
            <Typography variant="body1">{profile.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Role:</Typography>
            <Typography variant="body1">{profile.role}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Profile;
