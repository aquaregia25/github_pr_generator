// import React, { useState } from 'react';
// import { Container, TextField, Button } from '@mui/material';
// import octokit from '../../utils/octokit'

// const RepositoryPage = () => {
//   const [repoName, setRepoName] = useState('');
//   const [branchName, setBranchName] = useState('');

//   const createRepository = async () => {
//     try {
//       await octokit.request('POST /user/repos', {
//         name: repoName
//       });
//       alert('Repository created successfully!');
//     } catch (error) {
//       alert('Error creating repository');
//     }
//   };

//   const addBranch = async () => {
//     try {
//       await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
//         owner: 'your-username',
//         repo: repoName,
//         ref: `refs/heads/${branchName}`,
//         sha: 'master'
//       });
//       alert('Branch added successfully!');
//     } catch (error) {
//       alert('Error adding branch');
//     }
//   };

//   const mergeBranch = async () => {
//     try {
//       await octokit.request('POST /repos/{owner}/{repo}/merges', {
//         owner: 'your-username',
//         repo: repoName,
//         base: 'master',
//         head: branchName
//       });
//       alert('Branch merged successfully!');
//     } catch (error) {
//       alert('Error merging branch');
//     }
//   };

//   const handleRepoNameChange = (event) => {
//     setRepoName(event.target.value);
//   };

//   const handleBranchNameChange = (event) => {
//     setBranchName(event.target.value);
//   };

//   return (
//     <Container>
//       <h1>Create Repository</h1>
//       <TextField
//         label="Repository Name"
//         value={repoName}
//         onChange={handleRepoNameChange}
//         fullWidth
//         margin="normal"
//       />
//       <Button variant="contained" onClick={createRepository}>
//         Create Repository
//       </Button>

//       <h1>Add Branch</h1>
//       <TextField
//         label="Branch Name"
//         value={branchName}
//         onChange={handleBranchNameChange}
//         fullWidth
//         margin="normal"
//       />
//       <Button variant="contained" onClick={addBranch}>
//         Add Branch
//       </Button>

//       <h1>Merge Branch</h1>
//       <TextField
//         label="Branch Name"
//         value={branchName}
//         onChange={handleBranchNameChange}
//         fullWidth
//         margin="normal"
//       />
//       <Button variant="contained" onClick={mergeBranch}>
//         Merge Branch
//       </Button>
//     </Container>
//   );
// };

// export default RepositoryPage;



import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Select, MenuItem } from '@mui/material';
import octokit from '../../utils/octokit'


const RepositoryPage = () => {
  const [repoName, setRepoName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [fromBranch, setFromBranch] = useState('');
  const [toBranch, setToBranch] = useState('');

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      const response = await octokit.request('GET /user/repos');
      setRepositories(response.data.map((repo) => repo.name));
    } catch (error) {
      alert('Error fetching repositories');
    }
  };

  const createRepository = async () => {
    try {
      await octokit.request('POST /user/repos', {
        name: repoName,
      });
      alert('Repository created successfully!');
      fetchRepositories();
    } catch (error) {
      alert('Error creating repository');
    }
  };

  const addBranch = async () => {
    try {
      await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
        owner: 'aquaregia25',
        repo: repoName,
        ref: `refs/heads/${branchName}`,
        sha: 'master',
      });
      alert('Branch added successfully!');
    } catch (error) {
      alert('Error adding branch');
    }
  };

  const mergeBranch = async () => {
    try {
      await octokit.request('POST /repos/{owner}/{repo}/merges', {
        owner: 'aquaregia25',
        repo: repoName,
        base: toBranch,
        head: fromBranch,
      });
      alert('Branch merged successfully!');
    } catch (error) {
      alert('Error merging branch');
    }
  };

  const handleRepoNameChange = (event) => {
    setRepoName(event.target.value);
  };

  const handleBranchNameChange = (event) => {
    setBranchName(event.target.value);
  };

  const handleFromBranchChange = (event) => {
    setFromBranch(event.target.value);
  };

  const handleToBranchChange = (event) => {
    setToBranch(event.target.value);
  };

  return (
    <Container>
      <h1>Create Repository</h1>
      <TextField
        label="Repository Name"
        value={repoName}
        onChange={handleRepoNameChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={createRepository}>
        Create Repository
      </Button>

      <h1>Add Branch</h1>
      <TextField
        label="Branch Name"
        value={branchName}
        onChange={handleBranchNameChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={addBranch}>
        Add Branch
      </Button>

      <h1>Merge Branch</h1>
      <Select value={repoName} onChange={(e) => setRepoName(e.target.value)}>
        {repositories.map((repo) => (
          <MenuItem key={repo} value={repo}>
            {repo}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="From Branch"
        value={fromBranch}
        onChange={handleFromBranchChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="To Branch"
        value={toBranch}
        onChange={handleToBranchChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={mergeBranch}>
        Merge Branch
      </Button>
    </Container>
  );
};

export default RepositoryPage;
