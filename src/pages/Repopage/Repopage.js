import React from 'react';
import { Container } from '@mui/material';
import RepositoryForm from './components/CreateRepositoryForm';
import BranchForm from './components/BranchForm';
import MergeForm from './MergeForm';
import PullRequestForm from './components/PullRequestForm';
import SelectRepository from './components/SelectRepositoryForm';
import { useContext } from 'react';
import { RequestContext } from '../../utils/ContextApi/RequestContext';
import { useNavigate } from 'react-router-dom';
const RepositoryPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated,ownerDetails } = useContext(RequestContext);
  React.useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container>
      <h1> Hello {ownerDetails?.login}</h1>
      
      <RepositoryForm />
      <SelectRepository></SelectRepository>
      <PullRequestForm />
      <BranchForm />
    </Container>
  );
};

export default RepositoryPage;
