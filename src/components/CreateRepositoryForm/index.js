import React, { useContext, useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const RepositoryForm = ({RequestContext}) => {
  const { handleCreateRepository } = useContext(RequestContext);
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
          backgroundColor: '#0C5B8F',
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
