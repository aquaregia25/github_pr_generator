import React, { useContext, useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { RequestContext } from '../../../utils/ContextApi/RequestContext';

const MergeForm = () => {
  const {
    repositories,
    selectedRepos,
    selectedBranches,
    handleReposSelect,
    handleBranchesSelect,
    handleMergeBranch,
    handleRepoSelect,
  } = useContext(RequestContext);
  const [fromBranch, setFromBranch] = useState('');
  const [toBranch, setToBranch] = useState('');

  const handleFromBranchChange = (event) => {
    setFromBranch(event.target.value);
  };

  const handleToBranchChange = (event) => {
    setToBranch(event.target.value);
  };

  const handleMergeBranchHandler = () => {
    handleMergeBranch(selectedRepos, fromBranch, toBranch);
  };

  return (
    <>
      <h1>Merge Branch</h1>
      <TextField
        select
        label="Select Repository"
        value={selectedRepos}
        onChange={(e) => handleReposSelect(e.target.value)}
        fullWidth
        margin="normal"
        SelectProps={{
          multiple: true,
        }}
      >
        {repositories.map((repo) => (
          <MenuItem key={repo.name} value={repo.name}>
            {repo.name}
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
        SelectProps={{
          multiple: true,
        }}
      >
        {selectedBranches.map((branch) => (
          <MenuItem key={branch.name} value={branch.name}>
            {branch.name}
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
        SelectProps={{
          multiple: true,
        }}
      >
        {selectedBranches.map((branch) => (
          <MenuItem key={branch.name} value={branch.name}>
            {branch.name}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={handleMergeBranchHandler}>
        Merge Branch
      </Button>
    </>
  );
};

export default MergeForm;
