import React from 'react';
import { Container, Typography, Grid,Button } from '@mui/material';
import RepositoryForm from './components/CreateRepositoryForm';
import BranchForm from './components/BranchForm';
import MergeForm from './MergeForm';
import PullRequestForm from './components/PullRequestForm';
import SelectRepository from './components/SelectRepositoryForm';
import { useContext } from 'react';
import { RequestContext } from '../../utils/ContextApi/RequestContext';
import { useNavigate } from 'react-router-dom';
import ActivityTracker from './components/ActivityTracker';



const LogoutButton = () => {
  const { handleLogout } = useContext(RequestContext);

  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <Button
      variant="contained"
      onClick={handleLogoutClick}
      style={{
        backgroundColor: '#f44336',
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


const RepositoryPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, ownerDetails } = useContext(RequestContext);

  React.useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        padding: '16px',
        width: '80%',
        backgroundColor: '#f8f8f8',
        borderRadius: '4px',
      }}
    >
      <Grid container alignItems="center" sx={{justifyContent:"center"}}  spacing={2}>
        <Grid item>
          <Typography variant="h4" component="h1">
            Hello {ownerDetails?.login}
          </Typography>
        </Grid>
        <Grid item>
          <LogoutButton/>
        </Grid>
      </Grid>

      <RepositoryForm />
      <SelectRepository />
      <PullRequestForm />
      <BranchForm />
      <ActivityTracker />
    </div>
  );
};

export default RepositoryPage;
