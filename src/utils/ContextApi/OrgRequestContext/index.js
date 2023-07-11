import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { PopupContext } from '../PopupContext';
import { TrackerContext } from '../TrackerContext';
import { LoaderContext } from '../LoaderContext.js';
import { isRepoPresentInBranch,GetReposBranches, GetNewRepos,AddSearchFieldToRepoResponseData,AddSearchFieldToBranchResponseData,GetReplaceImageName } from './helper';

const OrgRequestContext = createContext();

const OrgRequestProvider = ({ children }) => {
  //PREVIOUS CONTEXTS
  const { openPopup } = useContext(PopupContext);
  const { addActivityData } = useContext(TrackerContext);
  const { workingInOrg, octokit } = useContext(AuthContext);
  const { showLoader, hideLoader } = useContext(LoaderContext);

  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [selectedReposBranch, setSelectedRepoBranch] = useState([]);
  const [selectedBranches, setSelectedBraches] = useState([]);

  useEffect(() => {
    if (workingInOrg === true)
      fetchOrganizations();
  }, [workingInOrg,]);

  useEffect(() => {
    if (selectedOrg !== '') {
      fetchRepositories();
    }
  }, [selectedOrg]);

  useEffect(() => {
    selectedRepos.map((repo) => {
      if (!isRepoPresentInBranch(selectedReposBranch, repo.name))
        fetchBranches(repo.name);
    })
    setSelectedRepoBranch(GetReposBranches(selectedReposBranch,selectedRepos));
  }, [selectedRepos]);

  //ALL HANDLERS
  const handleOrgSelect = (org) => {
    setSelectedOrg(org);
  }

  const handleReposSelect = (repos) => {
    setSelectedRepos(GetNewRepos(repos));
  }

  const handleBranchesSelect = (branches) => {
    setSelectedBraches(branches);
  }

  const fetchOrganizations = async () => {
    showLoader();
    try {
      const response = await octokit?.request('GET /user/orgs');
      const organizations = response?.data ?? [];
      setOrganizations(organizations);
    } catch (error) {
      openPopup('Error fetching organizations', 'error');
      addActivityData("Error fetching organizations", "error", error?.message||error );
    }
    finally {
      hideLoader();
    }
  };

  const fetchRepositories = async () => {
    try {
      const response = await octokit?.request('GET /orgs/{org}/repos', {
        org: selectedOrg
      });
      const repositories = AddSearchFieldToRepoResponseData(response?.data)
      setRepositories(repositories);
      addActivityData("Repositories fetched successfully!",  "success",  "repositories fetched" );

    } catch (error) {
      openPopup('Error fetching repositories', 'error');
      addActivityData( "Error fetching repositories",  "error",  error?.message );
    }
  };

  const fetchBranches = async (repoName) => {
    try {
      const response = await octokit?.request('GET /repos/{owner}/{repo}/branches', {
        owner: selectedOrg,
        repo: repoName,
      });
      const newBranches = AddSearchFieldToBranchResponseData(response?.data, repoName)

      setSelectedRepoBranch((prevSelectedReposBranch) => [
        ...prevSelectedReposBranch,
        ...newBranches,
      ]);
      addActivityData( "Branches fetched successfully!",  "success",  `branches fetched for ${repoName}` );

    } catch (error) {
      openPopup('Error fetching branches', 'error');
      addActivityData( "Error fetching branches",  "error",  error?.message );
    }
  };

  const handlResetStatesOnLogout = () => {
    setSelectedOrg('');
    setRepositories([]);
    setSelectedRepos([]);
    setSelectedRepoBranch([]);
    setSelectedBraches([]);
  }
  const handleAddBranch = async (repoName, branchName, baseBranch, addRules, rules) => {
    showLoader();
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
      addActivityData( "Branch added successfully!",  "success",  `branch ${branchName} added to ${repoName}` );

      if (addRules) {
        handleAddRules(repoName, branchName, rules);
      }

    } catch (error) {
      openPopup("Error: " + error?.message, 'error');
      addActivityData( "Error adding branch",  "error",  error?.message );
    }
    finally {
      hideLoader();
    }

  };
  const handleCreateRepository = async (repoName) => {
    showLoader();
    try {
      await octokit.request('POST /orgs/{org}/repos', {
        org: selectedOrg,
        name: repoName,
      });
      openPopup('Repository created successfully!', 'success');
      fetchRepositories();
      addActivityData( "Repository created successfully!",  "success",  `repository ${repoName} created` );
    } catch (error) {
      openPopup('Error creating repository ' + error?.message, 'error');
      addActivityData( "Error creating repository",  "error",  error?.message );
    }
    finally {
      hideLoader();
    }
  };

  const handleRaisePullRequest = async (repoName, fromBranch, toBranch, comments) => {
    showLoader();
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
      addActivityData( "Pull Request raised successfully!",  "success",  `pull request raised from ${fromBranch} to ${toBranch}` );
    } catch (error) {
      openPopup("Error: " + error?.message, 'error');
      addActivityData( "Error raising Pull Request",  "error",  error?.message );
    }
    finally {
      hideLoader();
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
        } : null,
        restrictions: rules.restrictions || null,
        required_linear_history: rules.linearHistory || false,
      });
      openPopup('Rules added successfully!', 'success');
      addActivityData( "Rules added successfully!",  "success",  `rules added to ${branchName} of ${repoName}` );
    } catch (error) {
      openPopup("Error: " + error?.message, 'error');
      addActivityData( "Error adding rules",  "error",  error?.message );
    }
  };

  const getFileContents = async (owner, repo, path, ref) => {
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: owner,
        repo: repo,
        path: path,
        ref: ref
      });
      const content = atob(response.data.content);

      addActivityData( "File contents fetched successfully!",  "success",  `file contents fetched from ${path} of ${repo}`);
      console.log("sha ",response.data.sha);
      return {content,sha:response.data.sha}

    } catch (error) {
      openPopup("Error In Fetching File SHA " + error?.message, 'error');
      addActivityData( "Error In Fetching File SHA",  "error",  error?.message );
      return null;
    }
  };
  
  const updateFileContents = async (owner, repo, path,branch, fileSha, content) => {
    try {

      const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: owner,
        repo: repo,
        path: path,
        message:`Update Image Name in ${path} file`,
        content: btoa(content),
        branch:branch,
        sha: fileSha,
      });

      addActivityData( "File updated successfully!",  "success",  `file updated in ${path} of ${repo}`);

    } catch (error) {
      console.error('Error updating file:', error);
      openPopup("Error updating file " + error?.message, 'error')
      addActivityData( "Error updating file",  "error",  error?.message );
      throw error;
    }
  };
  

  const handleUpdateImageNameInRepo = async (repoName, branchName, imageName, imagePath) => {
    showLoader();
    try {
      const owner = selectedOrg;
      const repo = repoName;
      const path = imagePath;
      const branch = branchName;
      const {content,sha}= await getFileContents(owner, repo, path, branch);

      console.log("recieved sha ",sha)

      var newContent = GetReplaceImageName(content,imageName);

      await updateFileContents(owner, repo, path,branchName, sha, newContent);

      openPopup('Image name updated successfully!', 'success');

      addActivityData( "Image name updated successfully!",  "success",  `image name updated to ${imageName} in ${path} of ${repoName}` );

    }
    catch (error) {
      openPopup("Error: " + error?.message, 'error');
      addActivityData( "Error updating image name",  "error",  error?.message );
      addActivityData( "Error updating image name",  "error",  error?.message );
    }
    finally {
      hideLoader();
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
        handleUpdateImageNameInRepo
      }}
    >
      {children}
    </OrgRequestContext.Provider>
  );
};

export { OrgRequestContext, OrgRequestProvider };

