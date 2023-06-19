import React, { useContext, useState, useEffect } from 'react';
import MultipleSelectChipCity from '../../../containers/MultiSelectField/MultiSelectField';
import { RequestContext } from '../../../utils/ContextApi/RequestContext';
import { Typography } from '@mui/material';

const SelectRepository = () => {
  const { repositories, handleReposSelect } = useContext(RequestContext);

  const handleReposSelectHandler = (event) => {
    let allWithFullData = repositories.filter((item) => event.includes(item.name));
    handleReposSelect(allWithFullData);
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
        Select Repository
      </Typography>
      <MultipleSelectChipCity
        setAllSelected={handleReposSelectHandler}
        name="Select Repository"
        allList={repositories}
      />
    </div>
  );
};

export default SelectRepository;
