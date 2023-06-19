import React, { useContext, useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { RequestContext } from '../../../utils/ContextApi/RequestContext';
import MultipleSelectChipCity from '../../../containers/MultiSelectField/MultiSelectField';

const PullRequestForm = () => {
  const {
    repositories,
    selectedRepos,
    selectedReposBranch,
    selectedBranches,
    handleRaisePullRequest,
    handleBranchesSelect,
  } = useContext(RequestContext);
  const [toBranch, setToBranch] = useState('');
  const [comments, setComments] = useState('');

  const handleToBranchChange = (event) => {
    setToBranch(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleRaisePullRequestHandler = () => {
    selectedBranches.forEach((branch) => {
      handleRaisePullRequest(branch.repoName, branch.name, toBranch, comments);
    });
  };

  const handleFromBranchChangeHandler = (event) => {
    const allWithFullData = selectedReposBranch.filter((item) => event.includes(item.name));
    handleBranchesSelect(allWithFullData);
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
      <h1>Raise Pull Request</h1>

      <MultipleSelectChipCity
        name="Select From Branch"
        allList={selectedReposBranch}
        setAllSelected={handleFromBranchChangeHandler}
      />

      <TextField
        label="To Branch"
        value={toBranch}
        onChange={handleToBranchChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Comments"
        value={comments}
        onChange={handleCommentsChange}
        multiline
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleRaisePullRequestHandler}>
        Raise Pull Request
      </Button>
    </div>
  );
};

export default PullRequestForm;
