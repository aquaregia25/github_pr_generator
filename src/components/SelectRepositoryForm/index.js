import React, { useContext, useState, useEffect } from 'react';
import MultipleSelectChipCity from '../MultiSelectField/MultiSelectField';
// import { RequestContext } from '../../../utils/ContextApi/RequestContext';
import { OrgRequestContext } from '../../utils/ContextApi/OrgRequestContext';
import { Typography } from '@mui/material';

const SelectRepository = ({RequestContext}) => {
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
