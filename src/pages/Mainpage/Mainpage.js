import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../utils/ContextApi/AuthContext';
import { Link } from 'react-router-dom';

const Mainpage = () => {
  const { isAuthenticated,handleWorkingInOrg, handleLogin } = useContext(AuthContext);
  const [ownerName, setOwnerName] = React.useState('');
  const [githubToken, setGithubToken] = React.useState('');

  const handleClick = () => {
    handleLogin(ownerName, githubToken);
  };


  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
      bgcolor="#f0f0f0" // Set the background color
    >


      {!isAuthenticated ? (
        <>
          <Typography variant="h4" component="h1" gutterBottom color="primary"> {/* Set the color */}
            Enter GitHub Your Token
          </Typography>
          <Box mt={3} width={400}> {/* Increase the width */}
            <TextField
              label="Enter GitHub Token"
              variant="outlined"
              fullWidth
              margin="normal"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              color="secondary"
              type="password"
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleClick}>
              Submit
            </Button>
          </Box></>) : (
        <>
          <Typography variant="h4" component="h1" gutterBottom color="primary"> {/* Set the color */}
            Choose Personal or Organization
          </Typography>
          <Box mt={3} width={400}> {/* Increase the width */}
            <Link to="/repository">
              <Button variant="contained" color="primary" fullWidth margin="normal" sx={{margin:'5%'}}>
                Personal
              </Button>
            </Link>
            <Link to="/orgrepo">
              <Button variant="contained" color="primary" fullWidth sx={{margin:'5%'}}>
                Organization
              </Button>
            </Link>
          </Box>
        </>
      )
      }



    </Box>
  );
};

export default Mainpage;
