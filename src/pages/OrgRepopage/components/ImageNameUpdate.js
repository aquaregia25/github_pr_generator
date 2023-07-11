import React from 'react'

import{Box,Typography,TextField,Button, MenuItem} from '@mui/material'
import { OrgRequestContext } from '../../../utils/ContextApi/OrgRequestContext';
import { PopupContext } from '../../../utils/ContextApi/PopupContext';

const ImageNameUpdate = () => {

  const { selectedRepos,selectedReposBranch,handleUpdateImageNameInRepo } = React.useContext(OrgRequestContext);
  const {openPopup} = React.useContext(PopupContext);


  const [branchName, setBranchName] = React.useState('');
  const [imageName, setImageName] = React.useState('');
  const [imagePath, setImagePath] = React.useState('');


  const handleBranchNameChange = (event) => {
    setBranchName(event.target.value);
  };
  const handleImageNameChange = (event) => {
    setImageName(event.target.value);
  };
  const handleImagePathChange = (event) => {
    setImagePath(event.target.value);
  };


  const handleImageNameUpdate = () => {
    //celery/app/amqp.py   celery main branch
    if(branchName === '' || imageName === '' || imagePath === ''){
      openPopup("Please fill all the fields",'error');
      return;
    }
    if(selectedRepos.length === 0){
      openPopup("Please select a repo",'error');
      return;
    }
    if(selectedRepos.length !==1){
      openPopup("Please select only one repo",'error');
      return;
    }
    handleUpdateImageNameInRepo(selectedRepos[0].name,branchName,imageName,imagePath);
  };




  return (
    <Box
      sx={{
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
        Add Update Image Name in Repo
      </Typography>
      <Typography variant="h6" component="h1" sx={{ mb: 3, color: 'red' }}>
        Select only one Repo Above
      </Typography>

      <TextField
        select
        label="Select Branch"
        value={branchName}
        onChange={handleBranchNameChange}
        fullWidth
        margin="normal"
      >
        {selectedReposBranch.map((branch) => (
          <MenuItem key={branch.name} value={branch.name}>
            {branch.name}
          </MenuItem>
        ))}


      </TextField>

      <TextField
        label="Image Name"
        value={imageName}
        onChange={handleImageNameChange}
        fullWidth
        margin="normal"
      />
      <TextField
      label="Path to Image File"
      value={imagePath}
      onChange={handleImagePathChange}
      fullWidth
      margin="normal"
    />
      <Button
        variant="contained"
        onClick={handleImageNameUpdate}
        sx={{
          mt: 3,
          bgcolor: '#0C5B8F',
          color: 'primary.contrastText',
          '&:hover': {
            bgcolor: '#0C5B8F',
          },
        }}
      >
        Update Image Name in repo
      </Button>
    </Box>
  )
}

export default ImageNameUpdate