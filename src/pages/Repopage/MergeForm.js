import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

const MergeForm = ({ repositories, branches, onMergeBranch, onSelectRepo, selectedRepo }) => {
  const [fromBranch, setFromBranch] = useState('');
  const [toBranch, setToBranch] = useState('');

  const handleFromBranchChange = (event) => {
    setFromBranch(event.target.value);
  };

  const handleToBranchChange = (event) => {
    setToBranch(event.target.value);
  };

  const handleMergeBranch = () => {
    onMergeBranch(selectedRepo, fromBranch, toBranch);
  };

  return (
    <>
      <h1>Merge Branch</h1>
      <TextField
        select
        label="Select Repository"
        value={selectedRepo}
        onChange={(e) => onSelectRepo(e.target.value)}
        fullWidth
        margin="normal"
      >
        {repositories.map((repo) => (
          <MenuItem key={repo} value={repo}>
            {repo}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="From Branch"
        value={fromBranch}
        onChange={handleFromBranchChange}
        fullWidth
        margin="normal"
      >
        {branches.map((branch) => (
          <MenuItem key={branch} value={branch}>
            {branch}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="To Branch"
        value={toBranch}
        onChange={handleToBranchChange}
        fullWidth
        margin="normal"
      >
        {branches.map((branch) => (
          <MenuItem key={branch} value={branch}>
            {branch}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={handleMergeBranch}>
        Merge Branch
      </Button>
    </>
  );
};

export default MergeForm;
