import React from 'react';
import {  Typography, Grid,Button,Box } from '@mui/material';
import RepositoryForm from '../../components/CreateRepositoryForm';
import BranchForm from '../../components/BranchForm';
import PullRequestForm from '../../components/PullRequestForm';
import SelectRepository from '../../components/SelectRepositoryForm';
import SelectOrganisation from '../../components/SelectOrganisation';
import { useContext } from 'react';
import { AuthContext } from '../../utils/ContextApi/AuthContext';
import { useNavigate } from 'react-router-dom';
import ActivityTracker from '../../components/ActivityTracker';
import ImageNameUpdate from './components/ImageNameUpdate';
import { TrackerContext } from '../../utils/ContextApi/TrackerContext';
import { OrgRequestContext } from '../../utils/ContextApi/OrgRequestContext';
import Navbar from '../../components/Navbar';


const RepositoryPage = () => {
  const {ownerDetails } = useContext(AuthContext);


  return (
    <Box sx={{background: 'white',}}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        // padding: '16px',
        width: '80%',
        // backgroundColor: '#f8f8f8',
        borderRadius: '4px',
        // backgroundImage: 'url(https://apps.blumesolutions.com/cas/themes/rez1/images/journey-line.png)',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // height: '100vh'
      }}
    >
      <Navbar ownerDetails={ownerDetails} workingPanel="Organisation"/>
      <SelectOrganisation RequestContext={OrgRequestContext}/>
      <RepositoryForm RequestContext={OrgRequestContext} />
      <SelectRepository RequestContext={OrgRequestContext}/>
      <PullRequestForm RequestContext={OrgRequestContext}/>
      <BranchForm RequestContext={OrgRequestContext} />
      <ImageNameUpdate />
      <ActivityTracker TrackerContext={TrackerContext}/>
    </div>
    </Box>
  );
};

export default RepositoryPage;
