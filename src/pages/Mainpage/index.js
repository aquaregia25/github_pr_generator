import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../utils/ContextApi/AuthContext';
import { Link } from 'react-router-dom';

const Mainpage = () => {
  const { isAuthenticated, handleWorkingInOrg, handleLogin } = useContext(AuthContext);
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
      p={3}
      // bgcolor="#f0f0f0" // Set the background color
      sx={{
        background: '#0f3557',
        backgroundImage: 'url(https://apps.blumesolutions.com/cas/themes/rez1/images/journey-line.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'

      }}

    >


      {!isAuthenticated ? (
        <>
          <Box sx={{
            background: "white",
            padding: "5%",
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
          }}>


            <Typography variant="h4" component="h1" gutterBottom color="black" sx={{ fontWeight: 'bold' }}> {/* Set the color */}
              Enter Your GitHub Token
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
              <Button variant="contained" sx={{backgroundColor: '#0C5B8F',}} fullWidth onClick={handleClick}>
                Submit
              </Button>
            </Box></Box></>) : (
        <>
          <Box sx={{
            background: "white",
            padding: "5%",
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
            justifyContent: 'center',
          }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black', textAlign: 'center' }} > {/* Set the color */}
              Choose WorkPlace
            </Typography>
            <Box mt={3} width={400}> {/* Increase the width */}
              <Link to="/repository">
                <Button variant="contained"sx={{backgroundColor: '#0C5B8F',}} fullWidth margin="normal" sx={{ marginBottom: '5vh' }}>
                  Personal
                </Button>
              </Link>
              <Link to="/orgrepo">
                <Button variant="contained" sx={{backgroundColor: '#0C5B8F',}} fullWidth >
                  Organization
                </Button>
              </Link>
            </Box>
          </Box>
        </>
      )
      }



    </Box>
  );
};

export default Mainpage;
