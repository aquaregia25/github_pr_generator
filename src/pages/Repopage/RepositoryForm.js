import React, { useState } from 'react';
import { TextField, Button,MenuItem } from '@mui/material';

const RepositoryForm = ({ repositories, onCreateRepository, onSelectRepo }) => {
  const [repoName, setRepoName] = useState('');

  const handleRepoNameChange = (event) => {
    setRepoName(event.target.value);
  };

  const handleCreateRepository = () => {
    onCreateRepository(repoName);
  };

  const handleRepoSelect = (event) => {
    onSelectRepo(event.target.value);
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
      <Button variant="contained" onClick={handleCreateRepository}>
        Create Repository
      </Button>

      <h1>Select Repository</h1>
      <TextField
        select
        label="Select Repository"
        value=""
        onChange={handleRepoSelect}
        fullWidth
        margin="normal"
      >
        {repositories.map((repo) => (
          <MenuItem key={repo} value={repo}>
            {repo}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default RepositoryForm;
