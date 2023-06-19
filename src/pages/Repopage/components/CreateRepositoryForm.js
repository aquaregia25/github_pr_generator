import React, { useContext, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { RequestContext } from '../../../utils/ContextApi/RequestContext';

const RepositoryForm = () => {
  const { handleCreateRepository } = useContext(RequestContext);
  const [repoName, setRepoName] = useState('');

  const handleRepoNameChange = (event) => {
    setRepoName(event.target.value);
  };

  const handleCreateRepositoryHandler = () => {
    handleCreateRepository(repoName);
  };

  return (
    <>
      <h1>Create Repository</h1>
      <TextField
        label="Repository Name"
        value={repoName}
        onChange={handleRepoNameChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleCreateRepositoryHandler}>
        Create Repository
      </Button>
    </>
  );
};

export default RepositoryForm;
