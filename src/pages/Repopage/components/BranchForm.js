import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Typography } from '@mui/material';
import { RequestContext } from '../../../utils/ContextApi/RequestContext';

const BranchForm = () => {
  const {
    repositories,
    selectedRepos,
    handleReposSelect,
    handleAddBranch,
    handleRepoSelect,
  } = useContext(RequestContext);
  const [branchName, setBranchName] = useState('');
  const [baseBranch, setBaseBranch] = useState('');

  const handleBranchNameChange = (event) => {
    setBranchName(event.target.value);
  };

  const handleBaseBranchChange = (event) => {
    setBaseBranch(event.target.value);
  };

  const handleAddBranchHandler = () => {
    selectedRepos.forEach((repo) => {
      handleAddBranch(repo.name, branchName, baseBranch);
    });
  };

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
      <Typography variant="h4" component="h1" style={{ marginBottom: '24px' }}>
        Add Branch to All Repositories
      </Typography>
      <TextField
        label="Branch Name"
        value={branchName}
        onChange={handleBranchNameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Base Branch Name (should be the same in all repos)"
        value={baseBranch}
        onChange={handleBaseBranchChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        onClick={handleAddBranchHandler}
        style={{
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        Add Branch
      </Button>
    </div>
  );
};

export default BranchForm;
