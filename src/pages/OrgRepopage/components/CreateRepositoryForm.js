import React, { useContext, useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
// import { RequestContext } from '../../../utils/ContextApi/RequestContext';
import { OrgRequestContext } from '../../../utils/ContextApi/OrgRequestContext';

const RepositoryForm = () => {
  const { handleCreateRepository } = useContext(OrgRequestContext);
  const [repoName, setRepoName] = useState('');

  const handleRepoNameChange = (event) => {
    setRepoName(event.target.value);
  };

  const handleCreateRepositoryHandler = () => {
    handleCreateRepository(repoName);
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
      <Typography variant="h4" component="h1" style={{ marginBottom: '24px' }}>
        Create Repository
      </Typography>
      <TextField
        label="Repository Name"
        value={repoName}
        onChange={handleRepoNameChange}
        fullWidth
        margin="normal"
        style={{ marginBottom: '16px' }}
      />
      <Button
        variant="contained"
        onClick={handleCreateRepositoryHandler}
        style={{
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        Create Repository
      </Button>
    </div>
  );
};

export default RepositoryForm;
