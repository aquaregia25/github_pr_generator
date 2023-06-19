import { Octokit } from "octokit";

export function createOctokit(githubToken) {
  return new Octokit({
    auth: githubToken, //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
  });
}