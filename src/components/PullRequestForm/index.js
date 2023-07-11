import React, { useContext, useState } from 'react';
import { TextField, Button,Typography } from '@mui/material';
// import { RequestContext } from '../../../utils/ContextApi/RequestContext';
import MultipleSelectChipCity from '../MultiSelectField/MultiSelectField';

const PullRequestForm = ({RequestContext}) => {
  const {
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
        margin: '5% auto',
        backgroundColor: 'white',
        padding: '5%', 
        width:'90%',
        color: 'Black',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
        borderRadius: '10px',
      }}
    >
           <Typography variant="h4" component="h1" style={{ marginBottom: '24px' }}>
Raise Pull Request</Typography >

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
      <Button sx={{backgroundColor:'#0C5B8F',color:'white'}} onClick={handleRaisePullRequestHandler}>
        Raise Pull Request
      </Button>
    </div>
  );
};

export default PullRequestForm;
