import React, { createContext, useState, useEffect } from 'react';
import { createOctokit } from '../../octokit';
import { useContext } from 'react';
import { PopupContext } from '../PopupContext';
import { TrackerContext } from '../TrackerContext';
import { AuthContext } from '../AuthContext';
import { useLocation, useNavigate } from 'react-router-dom/dist';
import { Octokit } from "octokit";

const RequestContext = createContext();

const RequestProvider = ({ children }) => {
  //PREVIOUS CONTEXTS
  const { openPopup } = useContext(PopupContext);
  const navigate = useNavigate();
  const location = useLocation();
  const {addActivityData}=useContext(TrackerContext);
  const {isAuthenticated,octokit,workingInOrg,ownerDetails}=useContext(AuthContext);

  const [ownerName, setOwnerName] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [selectedReposBranch, setSelectedRepoBranch] = useState([]);
  const [selectedBranches, setSelectedBraches] = useState([]);

  // ALL USEEFFECTS
  useEffect(() => {
  if(workingInOrg===false){
      
    setOwnerName(ownerDetails?.login);
    fetchRepositories();
  }

  }, [ownerDetails,workingInOrg]);
  
  useEffect(() => {

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
    const newRepos = repos.filter((repo, index) => repos.indexOf(repo) === index);
    setSelectedRepos(newRepos);

  }

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
      addActivityData("Repositories fetched successfully!","success","All repositories fetched");


    } catch (error) {
      // alert('Error fetching repositories');
      openPopup('Error fetching repositories', 'error');
      addActivityData("Error fetching repositories","error",error?.message);
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
      addActivityData("Branches fetched successfully!","success",`branches fetched for ${repoName}`);      
      // openPopup('Branches fetched successfully!', 'success');
    } catch (error) {
      // alert('Error fetching branches');
      openPopup('Error fetching branches', 'error');
      addActivityData("Error fetching branches","error",error?.message);

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
      addActivityData("Repository created successfully!","success",`repository ${repoName} created`);
    } catch (error) {
      // alert('Error creating repository');
      openPopup('Error creating repository '+error?.message, 'error');
      addActivityData("Error creating repository","error",error?.message);
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
      addActivityData("Branch added successfully!","success",`branch ${branchName} added to ${repoName}`);

      if(addRules){
        handleAddRules(repoName,branchName,rules);
      }

    } catch (error) {
      // alert('Error adding branch');
      openPopup("Error: " + error?.message, 'error');
      addActivityData("Error adding branch","error",error?.message);

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
      addActivityData("Rules added successfully!","success",`rules added to ${branchName} of ${repoName}`);
    } catch (error) {
      openPopup("Error: " + error?.message, 'error');
      addActivityData("Error adding rules","error",error?.message);
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
      addActivityData("Pull Request raised successfully!","success",`pull request raised from ${fromBranch} to ${toBranch}`);
    } catch (error) {
      // alert('Error raising Pull Request');
      openPopup("Error: " + error?.message, 'error');
      addActivityData("Error raising Pull Request","error",error?.message);
    }
  };

  const handlResetStatesOnLogout = () => {
    setOwnerName('');
    setRepositories([]);
    setSelectedRepos([]);
    setSelectedRepoBranch([]);
    setSelectedBraches([]);
  }

  
  //ALL CONTEXT VALUES WHICH ARE EXPORTED
  const contextValues = {
    repositories,
    selectedRepos,
    selectedReposBranch,
    selectedBranches,

    handleReposSelect,
    handleBranchesSelect,
    handleCreateRepository,
    handleAddBranch,
    handleRaisePullRequest,
  };
  return <RequestContext.Provider value={contextValues}>{children}</RequestContext.Provider>;
};

export { RequestContext, RequestProvider };
