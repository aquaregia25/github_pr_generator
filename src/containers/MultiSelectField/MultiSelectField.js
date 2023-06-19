import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChipCity({setAllSelected, name, allList}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event, value) => {
    setPersonName(value);
    setAllSelected(value);
  };

  return (
    <div>
      <FormControl sx={{ marginTop:2, width: '100%' }}>
        <Autocomplete
          multiple
          id="multiple-select-chip-city"
          options={allList}
          value={personName}
          onChange={handleChange}
          freeSolo={false}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label={name} placeholder="Search" />
          )}
        />
      </FormControl>
    </div>
  );
}
