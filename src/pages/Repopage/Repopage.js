import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import RepositoryForm from './RepositoryForm';
import BranchForm from './BranchForm';
import MergeForm from './MergeForm';
import PullRequestForm from './PullRequestForm';
import octokit from '../../utils/octokit';

const RepositoryPage = () => {
  const [repositories, setRepositories] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('');

  useEffect(() => {
    fetchRepositories();
  }, []);

  useEffect(() => {
    if (selectedRepo) {
      fetchBranches(selectedRepo);
    }
  }, [selectedRepo]);

  const fetchRepositories = async () => {
    try {
      const response = await octokit.request('GET /user/repos');
      setRepositories(response.data.map((repo) => repo.name));
    } catch (error) {
      alert('Error fetching repositories');
    }
  };

  const fetchBranches = async (repoName) => {
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: 'aquaregia25',
        repo: repoName,
      });
      setBranches(response.data.map((branch) => branch.name));
    } catch (error) {
      alert('Error fetching branches');
    }
  };

  const handleCreateRepository = async (repoName) => {
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

  const handleAddBranch = async (repoName, branchName) => {
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

  const handleMergeBranch = async (repoName, fromBranch, toBranch) => {
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

  const handleRaisePullRequest = async (repoName, fromBranch, toBranch) => {
    try {
      await octokit.request('POST /repos/{owner}/{repo}/pulls', {
        owner: 'aquaregia25',
        repo: repoName,
        head: fromBranch,
        base: toBranch,
        title: `Pull Request: ${fromBranch} to ${toBranch}`,
        body: 'Pull request description goes here',
      });
      alert('Pull Request raised successfully!');
    } catch (error) {
      alert('Error raising Pull Request');
    }
  };

  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo);
  };

  return (
    <Container>
      <RepositoryForm
        repositories={repositories}
        onCreateRepository={handleCreateRepository}
        onSelectRepo={handleRepoSelect}
      />
      <BranchForm
        repositories={repositories}
        // onAddBranch={handleAddBranch}
        onSelectRepo={handleRepoSelect}
      />
      <MergeForm
        repositories={repositories}
        branches={branches}
        onMergeBranch={handleMergeBranch}
        onSelectRepo={handleRepoSelect}
        selectedRepo={selectedRepo}
      />
      <PullRequestForm
        repositories={repositories}
        branches={branches}
        onRaisePullRequest={handleRaisePullRequest}
      />
    </Container>
  );
};

export default RepositoryPage;
