import React from 'react'
import { Typography, Grid, Box } from '@mui/material';
import LogoutButton from '../LogoutButton';

const Navbar = ({ ownerDetails, workingPanel }) => {
  return (
    <>
      <Box  sx={{
        justifyContent: "space-around",
        alignItems: "center", 
        width: '100%',
        backgroundColor: 'white', padding: '0 5vw', color: 'black',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'row',
        height: '10vh',
      }} spacing={2}>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
          <p style={{marginRight:'10vw' , fontSize:'1.5rem'}}>{ownerDetails?.login}!</p>
          <p >Working Panel: {workingPanel}</p>
        </Box>
        <Box sx={{display:'flex'}}>
          <LogoutButton />
        </Box>
      </Box>
    </>
  )
}

export default Navbar;