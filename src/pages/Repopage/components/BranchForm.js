import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { RequestContext } from '../../../utils/ContextApi/RequestContext';
import octokit from '../../../utils/octokit';
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


    selectedRepos.map((repo) => {
      handleAddBranch(repo.name, branchName, baseBranch);
    });


  };

  return (
    <>
      <h1>Add Branch To all Repo's (Base Branch name should be same in all)</h1>
      <TextField
        label="Branch Name"
        value={branchName}
        onChange={handleBranchNameChange}
        fullWidth
        margin="normal"
      />
      <TextField
      label="Base Branch Name (should be same in all repo) "
      value={baseBranch}
      onChange={handleBaseBranchChange}
      fullWidth
      margin="normal"
     />

      <Button variant="contained" onClick={handleAddBranchHandler}>
        Add Branch
      </Button>
    </>
  );
};

export default BranchForm;
