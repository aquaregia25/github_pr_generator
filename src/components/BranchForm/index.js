import React, { useContext, useState } from 'react';
import { TextField, Button, MenuItem, Typography, Checkbox, FormControlLabel, Box } from '@mui/material';

const BranchForm = ({RequestContext}) => {
  const {
    selectedRepos,
    selectedReposBranch,
    handleAddBranch,
  } = useContext(RequestContext);
  
  const [branchName, setBranchName] = useState('');
  const [baseBranch, setBaseBranch] = useState('');
  const [addCustomRules, setAddCustomRules] = useState(false);
  const [requirePR, setRequirePR] = useState(false);
  const [requiredApprovals, setRequiredApprovals] = useState(0);
  const [dismissStaleReviews, setDismissStaleReviews] = useState(false);
  const [requireCodeOwnerReviews, setRequireCodeOwnerReviews] = useState(false);
  const [linearHistory, setLinearHistory] = useState(false);
  const [enforceAdmins, setEnforceAdmins] = useState(false);
  const [requiredStatusChecks, setRequiredStatusChecks] = useState(true);
  const [restrictions, setRestrictions] = useState(null);
  const [restrictUsers, setRestrictUsers] = useState([]);
  const [restrictTeams, setRestrictTeams] = useState([]);
  const [restrictApps, setRestrictApps] = useState([]);
  const [commonBranches, setCommonBranches] = useState([]);


  //extract branches of same name for selected repos

  React.useEffect(() => {

    console.log(selectedReposBranch);
    console.log(selectedRepos);

    let map = new Map();
    selectedReposBranch.forEach((repo) => {
      if(map.has(repo.name)){
        map.set(repo.name,map.get(repo.name)+1);
      }
      else{
        map.set(repo.name,1);
      }
    });
    let commonBranches = [];
    map.forEach((value,key) => {
      if(value === selectedRepos?.length){
        commonBranches.push(key);
      }
    });
    setCommonBranches(commonBranches);
  },[selectedReposBranch]);





  const handleBranchNameChange = (event) => {
    setBranchName(event.target.value);
  };

  const handleBaseBranchChange = (event) => {
    setBaseBranch(event.target.value);
  };

  const handleAddBranchHandler = () => {
    selectedRepos.forEach((repo) => {
      handleAddBranch(repo.name, branchName, baseBranch, addCustomRules, {
        requirePR,
        requiredApprovals,
        dismissStaleReviews,
        requireCodeOwnerReviews,
        linearHistory,
        enforceAdmins,
        requiredStatusChecks,
        restrictions: restrictions ? {
          users: restrictUsers,
          teams: restrictTeams,
          apps: restrictApps,
        } : null,
      });
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5% auto',
        backgroundColor: 'white',
        padding: '5%', 
        width:'90%',
        color: 'black',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
        borderRadius: '10px',
      }}
    >
      <Typography variant="h4" component="h1" style={{ marginBottom: '24px' }}>

        Add Branch to All Selected Repositories
      </Typography>

      <TextField
        label="Branch Name"
        value={branchName}
        onChange={handleBranchNameChange}
        fullWidth
        margin="normal"
      />

      <TextField
        select
        label="Base Branch Name (should be the same in all repos)"
        value={baseBranch}
        onChange={handleBaseBranchChange}
        fullWidth
        margin="normal"
      >
        {
          commonBranches?.length !== 0?  commonBranches?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )) : <MenuItem value={''}>No common branches found</MenuItem>
        
        }
      

        </TextField>

      <FormControlLabel
        control={
          <Checkbox
            checked={addCustomRules}
            onChange={() => setAddCustomRules(!addCustomRules)}
            color="secondary"
          />
        }
        label="Add Custom Rules"
        sx={{ alignSelf: 'flex-start' }}
      />

      <Box sx={{ pl: 3 }}>
        {addCustomRules && (
          <>
            <FormControlLabel
              control={<Checkbox checked={requirePR} onChange={(e) => setRequirePR(e.target.checked)} color="secondary" />}
              label="Require a pull request before merging"
              sx={{ mt: 2 }}
            />

            {requirePR && (
              <>
                <TextField
                  select
                  label="Required number of approvals"
                  value={requiredApprovals}
                  onChange={(e) => setRequiredApprovals(e.target.value)}
                  sx={{ mt: 2, minWidth: '200px' }}
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <FormControlLabel
                  control={<Checkbox checked={dismissStaleReviews} onChange={(e) => setDismissStaleReviews(e.target.checked)} color="secondary" />}
                  label="Dismiss stale pull request approvals when new commits are pushed"
                  sx={{ mt: 2 }}
                />

                <FormControlLabel
                  control={<Checkbox checked={requireCodeOwnerReviews} onChange={(e) => setRequireCodeOwnerReviews(e.target.checked)} color="secondary" />}
                  label="Require review from Code Owners"
                  sx={{ mt: 2 }}
                />
              </>
            )}

            <FormControlLabel
              control={<Checkbox checked={linearHistory} onChange={(e) => setLinearHistory(e.target.checked)} color="secondary" />}
              label="Require linear history"
              sx={{ mt: 2 }}
            />

            <FormControlLabel
              control={<Checkbox checked={enforceAdmins} onChange={(e) => setEnforceAdmins(e.target.checked)} color="secondary" />}
              label="Enforce Admins"
              sx={{ mt: 2 }}
            />

            <FormControlLabel
              control={<Checkbox checked={requiredStatusChecks} onChange={(e) => setRequiredStatusChecks(e.target.checked)} color="secondary" />}
              label="Required Status Checks"
              sx={{ mt: 2 }}
            />

            <FormControlLabel
              control={<Checkbox  checked={restrictions} onChange={(e) => setRestrictions(e.target.checked)} color="secondary" />}
              label="Restrictions"
              sx={{ mt: 2 }}
            />

            {restrictions && (
              <>
                <TextField
                  label="Restrict Users (comma separated)"
                  value={restrictUsers}
                  onChange={(e) => setRestrictUsers(e.target.value.split(','))}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Restrict Teams (comma separated)"
                  value={restrictTeams}
                  onChange={(e) => setRestrictTeams(e.target.value.split(','))}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Restrict Apps (comma separated)"
                  value={restrictApps}
                  onChange={(e) => setRestrictApps(e.target.value.split(','))}
                  fullWidth
                  margin="normal"
                />
              </>
            )}
          </>
        )}
      </Box>

      <Button
        variant="contained"
        onClick={handleAddBranchHandler}
        sx={{
          mt: 3,
          bgcolor: '#0C5B8F',
          color: 'primary.contrastText',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        Add Branch
      </Button>
    </Box>
  );
};

export default BranchForm;
