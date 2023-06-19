import React, { useContext, useState, useEffect } from 'react';
import MultipleSelectChipCity from '../../../containers/MultiSelectField/MultiSelectField';
import { RequestContext } from '../../../utils/ContextApi/RequestContext';

const SelectRepository = () => {
  const { repositories, handleReposSelect } = useContext(RequestContext);
  const [allListOnlyName, setAllListOnlyName] = useState([]);

  useEffect(() => {
    let allListOnlyName = repositories.map((item) => item.name);
    setAllListOnlyName(allListOnlyName);
  }, [repositories]);

  const handleReposSelectHandler = (event) => {
    let allWithFullData = repositories.filter((item) => event.includes(item.name));
    handleReposSelect(allWithFullData);
  };

  return (
    <>
      <h1>Select Repository</h1>
      <MultipleSelectChipCity 
        setAllSelected={handleReposSelectHandler} 
        name="Select Repository" 
        allList={allListOnlyName} 
      />
    </>
  );
};

export default SelectRepository;
