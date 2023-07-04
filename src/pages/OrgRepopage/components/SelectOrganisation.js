import React, { useContext, useState, useEffect } from 'react';
import { Typography,MenuItem,TextField } from '@mui/material';
import { OrgRequestContext } from '../../../utils/ContextApi/OrgRequestContext';

const SelectOrganisation = () => {
  const { organizations, handleOrgSelect } = useContext(OrgRequestContext);
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
        margin: 'auto',
        padding: '16px',
        width: '80%',
        backgroundColor: '#f8f8f8',
        borderRadius: '4px',
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
