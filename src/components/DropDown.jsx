import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({data,onFilterChange}) {
  const [age, setAge] = React.useState('');
  
  const handleChange = (event) => {
    setAge(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Industry</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Industry"
          onChange={handleChange}
        >
            <MenuItem value="">None</MenuItem>
           
            {data.map((filter,index) => <MenuItem key={index} value={filter}>{filter}</MenuItem>)}
          
        </Select>
      </FormControl>
    </Box>
  );
}
