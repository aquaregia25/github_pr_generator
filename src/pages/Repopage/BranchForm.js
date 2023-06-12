import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import octokit from '../../utils/octokit';

const BranchForm = ({ repositories, onAddBranch, onSelectRepo }) => {
  const [repoName, setRepoName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [baseBranch, setBaseBranch] = useState('');
  const [baseBranches, setBaseBranches] = useState([]);

  useEffect(() => {
    if (repoName) {
      fetchBaseBranches(repoName);
    }
  }, [repoName]);

  const handleRepoNameChange = (event) => {
    setRepoName(event.target.value);
    onSelectRepo(event.target.value);
  };

  const handleBranchNameChange = (event) => {
    setBranchName(event.target.value);
  };

  const handleBaseBranchChange = (event) => {
    setBaseBranch(event.target.value);
  };

  const fetchBaseBranches = async (repoName) => {
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: 'aquaregia25',
        repo: repoName,
      });
      setBaseBranches(response.data);
    } catch (error) {
      alert('Error fetching base branches');
    }
  };



  const handleAddBranch = async () => {
    try {

      await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
        owner: 'aquaregia25',
        repo: repoName,
        ref: `refs/heads/${branchName}`,
        sha: baseBranches.find((branch)=>branch.name=baseBranch).commit.sha,
      });
      alert('Branch added successfully!');
    } catch (error) {
      alert('Error adding branch');
    }
  };

  return (
    <>
      <h1>Add Branch</h1>
      <TextField
        select
        label="Select Repository"
        value={repoName}
        onChange={handleRepoNameChange}
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
        label="Branch Name"
        value={branchName}
        onChange={handleBranchNameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Base Branch"
        value={baseBranch}
        onChange={handleBaseBranchChange}
        fullWidth
        margin="normal"
      >
        {baseBranches.map((branch) => (
          <MenuItem key={branch.name} value={branch.name}>
            {branch.name}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={handleAddBranch}>
        Add Branch
      </Button>
    </>
  );
};

export default BranchForm;
