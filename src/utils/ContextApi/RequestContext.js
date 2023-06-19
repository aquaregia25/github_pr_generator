import React, { createContext, useState, useEffect } from 'react';
import {createOctokit} from '../octokit';
import { useContext } from 'react';
import { PopupContext } from './PopupContext';
import { useLocation,useNavigate } from 'react-router-dom/dist';

const RequestContext = createContext();

const RequestProvider = ({ children }) => {

  const { openPopup } = useContext(PopupContext);
  const navigate = useNavigate();
  const location = useLocation();



  const [githubToken, setGithubToken] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerDetails, setOwnerDetails] = useState({}); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); // [false, () => {}
  const [repositories, setRepositories] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [selectedReposBranch, setSelectedRepoBranch]=useState([]);
  const [selectedBranches,setSelectedBraches]=useState([]);
  const [octokit, setOctokit] = useState(null);

  useEffect(() => {
    if (githubToken) {
      setOctokit(createOctokit(githubToken));
    }
  }, [githubToken]);


  
  useEffect(() => {
      octokit?.rest?.users?.getAuthenticated().then((response) => {
        setIsAuthenticated(true);
        setOwnerDetails(response.data);
      }).catch((error) => {
        setIsAuthenticated(false);
        setOwnerDetails({});
      });
    
  }, [octokit]);


  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/');
    }
    if (isAuthenticated === true && location.pathname === '/') {
      navigate('/repository');
    }
  }, [isAuthenticated, navigate,location]);


 
  useEffect(() => {
    if(isAuthenticated)
      fetchRepositories();
  }, [isAuthenticated]);

  useEffect(() => {
    selectedRepos.map((repo)=>{
      if(!selectedReposBranch.find((branch)=>branch.repoName===repo.name))
          fetchBranches(repo.name);
    })
    setSelectedRepoBranch(selectedReposBranch.filter(branch =>
      selectedRepos.some(repo => repo.name === branch.repoName)
  ));


  }, [selectedRepos]);

  const handleReposSelect=(repos)=>{
      // setSelectedRepos([...selectedRepos,repo]);
      //only repo with unique name should be added and repos is array of objects
      const newRepos=repos.filter((repo,index)=>repos.indexOf(repo)===index);
      setSelectedRepos(newRepos);

  }
  const handleGithubTokenChange = (event) => {
    setGithubToken(event);
  };
  const handleOwnerNameChange = (event) => {
    setOwnerName(event);
  };
  const handleBranchesSelect=(branches)=>{
    setSelectedBraches(branches);
  }


  const fetchRepositories = async () => {
    try {
      const response = await octokit.request('GET /user/repos');
      setRepositories(response.data);
    } catch (error) {
      // alert('Error fetching repositories');
      openPopup('Error fetching repositories', 'error');
    }
  };

  const fetchBranches = async (repoName) => {
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: ownerName,
        repo: repoName,
      });
      const newBranches=response.data;

      // add repo name to each branch object

      newBranches.forEach((branch)=>{
        branch.repoName=repoName;
      });


      setSelectedRepoBranch([...selectedReposBranch,...newBranches]);
      console.log("selectrepobranch",selectedReposBranch);
      // openPopup('Branches fetched successfully!', 'success');
    } catch (error) {
      // alert('Error fetching branches');
      openPopup('Error fetching branches', 'error');
      
    }
  };

  const handleCreateRepository = async (repoName) => {
    try {
      await octokit.request('POST /user/repos', {
        name: repoName,
      });
      // alert('Repository created successfully!');
      openPopup('Repository created successfully!', 'success');
      fetchRepositories();
    } catch (error) {
      // alert('Error creating repository');
      openPopup('Error creating repository', 'error');

    }
  };

  const handleAddBranch = async (repoName, branchName) => {
    try {
      await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
        owner: ownerName,
        repo: repoName,
        ref: `refs/heads/${branchName}`,
        sha: selectedReposBranch.find((branch) => branch.repoName === repoName).commit.sha,
      });
      // alert('Branch added successfully!');
      openPopup('Branch added successfully!', 'success');
    } catch (error) {
      // alert('Error adding branch');
      openPopup("Error: "+error?.message, 'error');

    }
  };

  const handleMergeBranch = async (repoName, fromBranch, toBranch) => {
    try {
      await octokit.request('POST /repos/{owner}/{repo}/merges', {
        owner: ownerName,
        repo: repoName,
        base: toBranch,
        head: fromBranch,
      });
      // alert('Branch merged successfully!');
      openPopup('Branch merged successfully!', 'success');
    } catch (error) {
      // alert('Error merging branch');
      console.log(error)
      openPopup("Error: "+error?.message, 'error');
    }
  };

  const handleRaisePullRequest = async (repoName, fromBranch, toBranch,comments) => {
    try {
      await octokit.request('POST /repos/{owner}/{repo}/pulls', {
        owner: ownerName,
        repo: repoName,
        head: fromBranch,
        base: toBranch,
        title: `Pull Request: ${fromBranch} to ${toBranch}`,
        body: comments,
      });
      // alert('Pull Request raised successfully!');
      openPopup('Pull Request raised successfully!', 'success');
    } catch (error) {
      // alert('Error raising Pull Request');
      openPopup("Error: "+error?.message, 'error');

    }
  };


  const contextValues = {
    repositories,
    selectedRepos,
    selectedReposBranch,
    selectedBranches,
    githubToken,
    ownerDetails,


    handleReposSelect,
    handleBranchesSelect,
    handleCreateRepository,
    handleAddBranch,
    handleMergeBranch,
    handleRaisePullRequest,
    handleGithubTokenChange,
    handleOwnerNameChange,
  };

  return <RequestContext.Provider value={contextValues}>{children}</RequestContext.Provider>;
};

export { RequestContext, RequestProvider };
