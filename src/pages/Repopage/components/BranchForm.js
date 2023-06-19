import React, { useContext, useState } from 'react';
import { TextField, Button, MenuItem, Typography, Checkbox, FormControlLabel, Box } from '@mui/material';
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        m: 'auto',
        p: 4,
        width: '80%',
        bgcolor: 'background.paper',
        borderRadius: '4px',
        color: 'text.primary',
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 3, color: 'text.secondary' }}>
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
          bgcolor: 'primary.main',
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
