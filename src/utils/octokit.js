import { Octokit } from "octokit";

export function createOctokit(githubToken) {
  return new Octokit({
    auth: githubToken, //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
  });
}