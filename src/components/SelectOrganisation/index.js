import React, { useContext, useState, useEffect } from 'react';
import { Typography, MenuItem, TextField } from '@mui/material';

const SelectOrganisation = ({ RequestContext }) => {
  const { organizations, handleOrgSelect } = useContext(RequestContext);
  const [orgsName, setOrgsName] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState('');

  useEffect(() => {
    setOrgsName(organizations.map((org) => org.login));
  }, [organizations]);

  const handleReposSelectHandler = (event) => {
    handleOrgSelect(event);
    setSelectedOrg(event);
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
        Select Organisation First
      </Typography>
      <TextField
        select
        label="Select Organisation"
        value={selectedOrg}
        onChange={(e) => handleReposSelectHandler(e.target.value)}
        fullWidth
        margin="normal"
      >


        {orgsName.map((org) => (
          <MenuItem key={org} value={org}>
            {org}
          </MenuItem>
        ))}

      </TextField>


    </div>
  );
};

export default SelectOrganisation;
