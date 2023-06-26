import React, { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import { PopupContext } from './PopupContext';
import { TrackerContext } from './TrackerContext';
import { AuthContext } from './AuthContext';
import { useLocation, useNavigate } from 'react-router-dom/dist';

const OrgRequestContext = createContext();

const OrgRequestProvider = ({ children }) => {
  //PREVIOUS CONTEXTS
  const { openPopup } = useContext(PopupContext);
  const navigate = useNavigate();
  const location = useLocation();
  const {addActivityData}=useContext(TrackerContext);
  const {isAuthenticated,octokit}=useContext(AuthContext);

  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [selectedReposBranch, setSelectedRepoBranch] = useState([]);
  const [selectedBranches, setSelectedBraches] = useState([]);

  useEffect(() => {
    if (isAuthenticated)
      fetchOrganizations();
    if(!isAuthenticated)
      handlResetStatesOnLogout();
  }, [isAuthenticated]);

  useEffect(() => {
    if(isAuthenticated && selectedOrg) {
      fetchRepositories();
    }
  }, [selectedOrg]);
  
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
  const handleOrgSelect = (org) => {
    setSelectedOrg(org);
  }

  const handleReposSelect = (repos) => {
    const newRepos = repos.filter((repo, index) => repos.indexOf(repo) === index);
    setSelectedRepos(newRepos);
  }

  const handleBranchesSelect = (branches) => {
    setSelectedBraches(branches);
  }

  const fetchOrganizations = async () => {
    try {
      const response = await octokit?.request('GET /user/orgs');
      const organizations = response?.data ?? [];
      setOrganizations(organizations);
    } catch (error) {
      openPopup('Error fetching organizations', 'error');
      addActivityData({time:new Date(),type:"Error fetching organizations",status:"error",message:error?.message});
    }
  };

  const fetchRepositories = async () => {
    try {
      const response = await octokit?.request('GET /orgs/{org}/repos', {
        org: selectedOrg
      });
      const repositories = response.data?.map((item) => {
        return { ...item, searchField: `Name:${item.name} | Desc:${item.description}` };
      }) ?? [];
      setRepositories(repositories);      
      addActivityData({time:new Date(),type:"Repositories fetched successfully!",status:"success",message:"repositories fetched"});

    } catch (error) {
      openPopup('Error fetching repositories', 'error');
      addActivityData({time:new Date(),type:"Error fetching repositories",status:"error",message:error?.message});
    }
  };

  const fetchBranches = async (repoName) => {
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: selectedOrg,
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
      addActivityData({time:new Date(),type:"Branches fetched successfully!",status:"success",message:`branches fetched for ${repoName}`});      

    } catch (error) {
      openPopup('Error fetching branches', 'error');
      addActivityData({time:new Date(),type:"Error fetching branches",status:"error",message:error?.message});
    }
  };

  const handlResetStatesOnLogout = () => {
    setSelectedOrg('');
    setRepositories([]);
    setSelectedRepos([]);
    setSelectedRepoBranch([]);
    setSelectedBraches([]);
  }
  const handleAddBranch = async ( repoName, branchName, baseBranch, addRules, rules) => {
    try {
      const baseBranchData = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
        owner: selectedOrg,
        repo: repoName,
        branch: baseBranch,
      });
  
      await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
        owner: selectedOrg,
        repo: repoName,
        ref: `refs/heads/${branchName}`,
        sha: baseBranchData.data.commit.sha,
      });
  
      openPopup('Branch added successfully!', 'success');
      addActivityData({time:new Date(),type:"Branch added successfully!",status:"success",message:`branch ${branchName} added to ${repoName}`});
  
      if(addRules){
        handleAddRules( repoName, branchName, rules);
      }
  
    } catch (error) {
      openPopup("Error: " + error?.message, 'error');
      addActivityData({time:new Date(),type:"Error adding branch",status:"error",message:error?.message});
    }
  };
  const handleCreateRepository = async ( repoName) => {
    try {
      await octokit.request('POST /orgs/{org}/repos', {
        org: selectedOrg,
        name: repoName,
      });
      openPopup('Repository created successfully!', 'success');
      fetchRepositories();
      addActivityData({time:new Date(),type:"Repository created successfully!",status:"success",message:`repository ${repoName} created`});
    } catch (error) {
      openPopup('Error creating repository '+error?.message, 'error');
      addActivityData({time:new Date(),type:"Error creating repository",status:"error",message:error?.message});
    }
  };
  
  const handleRaisePullRequest = async ( repoName, fromBranch, toBranch, comments) => {
    try {
      await octokit.request('POST /repos/{owner}/{repo}/pulls', {
        owner: selectedOrg,
        repo: repoName,
        head: fromBranch,
        base: toBranch,
        title: `Pull Request: ${fromBranch} to ${toBranch}`,
        body: comments,
      });
      openPopup('Pull Request raised successfully!', 'success');
      addActivityData({time:new Date(),type:"Pull Request raised successfully!",status:"success",message:`pull request raised from ${fromBranch} to ${toBranch}`});
    } catch (error) {
      openPopup("Error: " + error?.message, 'error');
      addActivityData({time:new Date(),type:"Error raising Pull Request",status:"error",message:error?.message});
    }
  };
  const handleAddRules = async (repoName, branchName, rules) => {
    try {
      await octokit.request('PUT /repos/{owner}/{repo}/branches/{branch}/protection', {
        owner: selectedOrg,
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

  return (
    <OrgRequestContext.Provider
      value={{
        organizations,
        handleOrgSelect,
        repositories,
        selectedRepos,
        handleReposSelect,
        selectedReposBranch,
        handleBranchesSelect,
        selectedBranches,
        handleCreateRepository,
        handleRaisePullRequest,
        handleAddBranch,
      }}
    >
      {children}
    </OrgRequestContext.Provider>
  );
};

export { OrgRequestContext, OrgRequestProvider };
