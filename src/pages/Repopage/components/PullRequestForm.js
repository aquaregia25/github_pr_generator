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
  const [allListOnlyName, setAllListOnlyName] = useState([]);

  React.useEffect(() => {
    let allListOnlyName = selectedReposBranch.map((item) => item.name);
    setAllListOnlyName(allListOnlyName);
  }, [selectedReposBranch]);

  const handleToBranchChange = (event) => {
    setToBranch(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleRaisePullRequestHandler = () => {


    selectedBranches.map((branch) => {
      handleRaisePullRequest(branch.repoName, branch.name, toBranch, comments);
    });


    // handleRaisePullRequest(selectedRepos, fromBranch, toBranch);


  };

  const handleFromBranchChangeHandler = (event) => {
    let allWithFullData= selectedReposBranch.filter((item) => event.includes(item.name));
    console.log("allWithFullData",allWithFullData)
    handleBranchesSelect(allWithFullData);
  };



  return (
    <>
      <h1>Raise Pull Request</h1>

    <MultipleSelectChipCity name="Select From Branch" allList={allListOnlyName} setAllSelected={handleFromBranchChangeHandler} />

    {/* enter name of the base branch */}
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



      
    </>
  );
};

export default PullRequestForm;
