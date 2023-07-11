import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { AuthContext } from '../../utils/ContextApi/AuthContext';


const LogoutButton = () => {
    const { handleLogout } = useContext(AuthContext);
  
    const handleLogoutClick = () => {
      handleLogout();
    };
  
    return (
      <Button
        variant="contained"
        onClick={handleLogoutClick}
        style={{
          backgroundColor: '#0C5B8F',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#d32f2f',
          },
        }}
      >
        Logout
      </Button>
    );
  };


export default LogoutButton;    