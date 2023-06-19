import { Octokit } from "octokit";

export function createOctokit(githubToken) {
  return new Octokit({
    auth: githubToken, //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
  });
}