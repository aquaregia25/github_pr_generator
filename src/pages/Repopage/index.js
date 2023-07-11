import React from 'react';
import {Typography, Grid,Button } from '@mui/material';

import { useContext } from 'react';
import { AuthContext } from '../../utils/ContextApi/AuthContext';
import { useNavigate } from 'react-router-dom';

import { TrackerContext } from '../../utils/ContextApi/TrackerContext';
import {RequestContext} from '../../utils/ContextApi/RequestContext';

import RepositoryForm from '../../components/CreateRepositoryForm';
import BranchForm from '../../components/BranchForm';
import PullRequestForm from '../../components/PullRequestForm';
import SelectRepository from '../../components/SelectRepositoryForm';
import ActivityTracker from '../../components/ActivityTracker';
import Navbar from '../../components/Navbar';

const RepositoryPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, ownerDetails } = useContext(AuthContext);

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

      <Navbar ownerDetails={ownerDetails} workingPanel="Personal" />
      <RepositoryForm RequestContext={RequestContext} />
      <SelectRepository RequestContext={RequestContext}/>
      <PullRequestForm RequestContext={RequestContext}/>
      <BranchForm RequestContext={RequestContext} />
      <ActivityTracker TrackerContext={TrackerContext}/>
    </div>
  );
};

export default RepositoryPage;
