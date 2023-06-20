import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { RequestContext } from '../../utils/ContextApi/RequestContext';

const Mainpage = () => {
  const { isAuthenticated,handleLogin } = useContext(RequestContext);
  const navigate = useNavigate();
  const [ownerName, setOwnerName] = React.useState('');
  const [githubToken, setGithubToken] = React.useState('');

  const handleClick = () => {

    handleLogin(ownerName, githubToken);
  };

  React.useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/repository');
    }
  }, [isAuthenticated, navigate]);

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
      <Typography variant="h4" component="h1" gutterBottom color="primary"> {/* Set the color */}
        Enter GitHub Your Token
      </Typography>
      <Box mt={3} width={400}> {/* Increase the width */}
        {/* <TextField
          label="Enter Owner Name (GitHub Username)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          color="secondary" // Set the color
        /> */}
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
      </Box>
    </Box>
  );
};

export default Mainpage;
