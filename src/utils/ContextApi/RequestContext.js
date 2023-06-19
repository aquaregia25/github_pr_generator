import React, { createContext, useState, useEffect } from 'react';
import { createOctokit } from '../octokit';
import { useContext } from 'react';
import { PopupContext } from './PopupContext';
import { TrackerContext } from './TrackerContext';
import { useLocation, useNavigate } from 'react-router-dom/dist';

const RequestContext = createContext();

const RequestProvider = ({ children }) => {
  //PREVIOUS CONTEXTS
  const { openPopup } = useContext(PopupContext);
  const navigate = useNavigate();
  const location = useLocation();
  const {addActivityData}=useContext(TrackerContext);

  //ALL STATES
  // const [githubToken, setGithubToken] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerDetails, setOwnerDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false); // [false, () => {}
  const [repositories, setRepositories] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [selectedReposBranch, setSelectedRepoBranch] = useState([]);
  const [selectedBranches, setSelectedBraches] = useState([]);
  const [octokit, setOctokit] = useState(null);

  // ALL USEEFFECTS
  useEffect(() => {
    octokit?.rest?.users?.getAuthenticated().then((response) => {
      setIsAuthenticated(true);
      navigate('/repository');
      setOwnerDetails(response.data);
    }).catch((error) => {
      setIsAuthenticated(false);
      navigate('/');
      openPopup('Error In Token Login!!','error')
      addActivityData({time:new Date(),type:"Error In Token Login" ,status:"error",message:error?.message});
      setOwnerDetails({});
    });

  }, [octokit]);
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/');
    }
    else if (isAuthenticated === true) {
      navigate('/repository');
    }
  }, [isAuthenticated, navigate, location]);
  useEffect(() => {
    if (isAuthenticated)
      fetchRepositories();
  }, [isAuthenticated,octokit]);
  useEffect(() => {


    if(isAuthenticated ===false)
      return;
    selectedRepos.map((repo) => {
      if (!selectedReposBranch.find((branch) => branch.repoName === repo.name))
        fetchBranches(repo.name);
    })
    setSelectedRepoBranch(selectedReposBranch.filter(branch =>
      selectedRepos.some(repo => repo.name === branch.repoName)
    ));


  }, [selectedRepos]);



  //ALL HANDLERS
  const handleReposSelect = (repos) => {
    // setSelectedRepos([...selectedRepos,repo]);
    //only repo with unique name should be added and repos is array of objects
    const newRepos = repos.filter((repo, index) => repos.indexOf(repo) === index);
    setSelectedRepos(newRepos);

  }

  const handleOwnerNameChange = (event) => {
    setOwnerName(event);
  };
  const handleBranchesSelect = (branches) => {
    setSelectedBraches(branches);
  }
  const fetchRepositories = async () => {
    try {
      const response = await octokit?.request('GET /user/repos');
      const repositories = response.data?.map((item) => {
        return { ...item, searchField: `Name:${item.name} | Desc:${item.description}` };
      }) ?? [];
      
      setRepositories(repositories);      
      console.log("repos", repositories);
      addActivityData({time:new Date(),type:"Repositories fetched successfully!",status:"success",message:"repositories fetched"});


    } catch (error) {
      // alert('Error fetching repositories');
      openPopup('Error fetching repositories', 'error');
      addActivityData({time:new Date(),type:"Error fetching repositories",status:"error",message:error?.message});
    }
  };

  const fetchBranches = async (repoName) => {
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: ownerName,
        repo: repoName,
      });
      const newBranches = response?.data?.map((branch) => ({
        ...branch,
        repoName: repoName,
        searchField: `Repo:${repoName} | Branch:${branch.name}`,
      }));
      
      setSelectedRepoBranch((prevSelectedReposBranch) => [
        ...prevSelectedReposBranch,
        ...newBranches,
      ]);
      console.log("selectrepobranch", selectedReposBranch);
      addActivityData({time:new Date(),type:"Branches fetched successfully!",status:"success",message:`branches fetched for ${repoName}`});      
      // openPopup('Branches fetched successfully!', 'success');
    } catch (error) {
      // alert('Error fetching branches');
      openPopup('Error fetching branches', 'error');
      addActivityData({time:new Date(),type:"Error fetching branches",status:"error",message:error?.message});

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
      addActivityData({time:new Date(),type:"Repository created successfully!",status:"success",message:`repository ${repoName} created`});
    } catch (error) {
      // alert('Error creating repository');
      openPopup('Error creating repository', 'error');
      addActivityData({time:new Date(),type:"Error creating repository",status:"error",message:error?.message});
    }
  };

  const handleAddBranch = async (repoName, branchName,baseBranch,addRules,rules) => {
    try {
      await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
        owner: ownerName,
        repo: repoName,
        ref: `refs/heads/${branchName}`,
        sha: selectedReposBranch.find((branch) => branch.name === baseBranch)?.commit?.sha,
      });
      // alert('Branch added successfully!');
      openPopup('Branch added successfully!', 'success');
      addActivityData({time:new Date(),type:"Branch added successfully!",status:"success",message:`branch ${branchName} added to ${repoName}`});

      if(addRules){
        handleAddRules(repoName,branchName,rules);
      }

    } catch (error) {
      // alert('Error adding branch');
      openPopup("Error: " + error?.message, 'error');
      addActivityData({time:new Date(),type:"Error adding branch",status:"error",message:error?.message});

    }
  };


  const handleAddRules = async (repoName, branchName, rules) => {
    try {
      await octokit.request('PUT /repos/{owner}/{repo}/branches/{branch}/protection', {
        owner: ownerName,
        repo: repoName,
        branch: branchName,
        required_pull_request_reviews: {
          required_approving_review_count: rules.requiredApprovals || 1,
          dismiss_stale_reviews: rules.dismissStaleReviews || false,
          require_code_owner_reviews: rules.requireCodeOwnerReviews || false,
        },
        enforce_admins: rules.enforceAdmins || null,
        required_status_checks: rules.requiredStatusChecks ? {
          strict: true,
          contexts: []
        }:null,
        restrictions: rules.restrictions || null,
        required_linear_history: rules.linearHistory || false,
      });
      openPopup('Rules added successfully!', 'success');
      addActivityData({time:new Date(),type:"Rules added successfully!",status:"success",message:`rules added to ${branchName} of ${repoName}`});
    } catch (error) {
      openPopup("Error: " + error?.message, 'error');
      addActivityData({time:new Date(),type:"Error adding rules",status:"error",message:error?.message});
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
      openPopup("Error: " + error?.message, 'error');
    }
  };

  const handleRaisePullRequest = async (repoName, fromBranch, toBranch, comments) => {
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
      addActivityData({time:new Date(),type:"Pull Request raised successfully!",status:"success",message:`pull request raised from ${fromBranch} to ${toBranch}`});
    } catch (error) {
      // alert('Error raising Pull Request');
      openPopup("Error: " + error?.message, 'error');
      addActivityData({time:new Date(),type:"Error raising Pull Request",status:"error",message:error?.message});
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);

    setOwnerName('');
    setOwnerDetails({});
    setRepositories([]);
    setSelectedRepos([]);
    setSelectedRepoBranch([]);
    setSelectedBraches([]);
    setOctokit(null);
    navigate('/');
  };
  const handleLogin = (ownerName, githubToken) => {
    setOwnerName(ownerName);
    setOctokit(createOctokit(githubToken));
    // setIsAuthenticated(true);
    // navigate('/repository');

  };


  //ALL CONTEXT VALUES WHICH ARE EXPORTED
  const contextValues = {
    repositories,
    selectedRepos,
    selectedReposBranch,
    selectedBranches,
    ownerDetails,

    handleReposSelect,
    handleBranchesSelect,
    handleCreateRepository,
    handleAddBranch,
    handleMergeBranch,
    handleRaisePullRequest,
    handleOwnerNameChange,
    handleLogout,
    handleLogin,
  };

  return <RequestContext.Provider value={contextValues}>{children}</RequestContext.Provider>;
};

export { RequestContext, RequestProvider };
