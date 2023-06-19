import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function MultipleSelectChipCity({ setAllSelected, name, allList }) {
  const [personName, setPersonName] = useState([]);
  const [options, setOptions] = useState([]);
  const [searchMap, setSearchMap] = useState(new Map());

  useEffect(() => {
    const newOptions = allList?.map((option) => option?.searchField) ?? [];
    setOptions(newOptions);

    let newMap = new Map();
    allList?.forEach((option) => {
      newMap.set(option?.searchField, option?.name);
    });
    setSearchMap(newMap);
  }, [allList]);

  const handleChange = (event, value) => {
    setPersonName(value);
    const newVal = value?.map((item) => searchMap.get(item));
    setAllSelected(newVal);
  };

  return (
      <FormControl sx={{ marginTop: 2, width: '100%' }}>
        <Autocomplete
          multiple
          id="multiple-select-chip-city"
          options={options}
          value={personName}
          onChange={handleChange}
          freeSolo={false}
          renderTags={(value, getTagProps) =>
            value?.map((option, index) => (
              <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label={name} placeholder="Search" />
          )}
        />
      </FormControl>
  );
}
