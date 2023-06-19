import { TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { RequestContext } from '../../utils/ContextApi/RequestContext'

const Mainpage = () => {
  const { isAuthenticated, handleOwnerNameChange,handleGithubTokenChange } = useContext(RequestContext)
  const navigate = useNavigate()
  const [ownerName, setOwnerName] = React.useState('')
  const [githubToken, setGithubToken] = React.useState('')
    
  const handleClick = () => {
    if (ownerName && githubToken) {
      handleOwnerNameChange(ownerName)
      handleGithubTokenChange(githubToken)
    }
  }

  React.useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/repository')
    }

    
  }, [isAuthenticated, navigate])


  return (
    <>
    <TextField 
      label="Enter Owner Name (Gihub Username)"
      variant="outlined"
      fullWidth
      margin="normal"
      value={ownerName}
      onChange={(e)=>setOwnerName(e.target.value)}
    />
    <TextField
      label="Enter Github Token"
      variant="outlined"
      fullWidth
      margin="normal"
      value={githubToken}
      onChange={(e)=>setGithubToken(e.target.value)}
    />
    <button onClick={handleClick}>Submit</button>

</>

  )
}

export default Mainpage