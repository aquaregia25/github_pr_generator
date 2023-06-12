import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import octokit from '../../utils/octokit';

const PullRequestForm = ({ repositories, branches, onRaisePullRequest }) => {
  const [repoName, setRepoName] = useState('');
  const [fromBranch, setFromBranch] = useState('');
  const [toBranch, setToBranch] = useState('');
  const [comments, setComments] = useState('');

  const handleRepoNameChange = (event) => {
    setRepoName(event.target.value);
  };

  const handleFromBranchChange = (event) => {
    setFromBranch(event.target.value);
  };

  const handleToBranchChange = (event) => {
    setToBranch(event.target.value);
  };
  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };
  const handleRaisePullRequest = async () => {
    try {
      await octokit.request('POST /repos/{owner}/{repo}/pulls', {
        owner: 'aquaregia25',
        repo: repoName,
        head: fromBranch,
        base: toBranch,
        title: `Pull Request: ${fromBranch} to ${toBranch}`,
        body: comments,
      });
      alert('Pull Request raised successfully!');
      onRaisePullRequest(repoName, fromBranch, toBranch);
    } catch (error) {
      alert('Error raising Pull Request');
    }
  };

  return (
    <>
      <h1>Raise Pull Request</h1>
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
      <TextField
        label="Comments"
        value={comments}
        onChange={handleCommentsChange}
        multiline
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleRaisePullRequest}>
        Raise Pull Request
      </Button>
    </>
  );
};

export default PullRequestForm;
