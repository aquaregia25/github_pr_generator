import { Octokit } from "octokit";

export function createOctokit(githubToken) {
  return new Octokit({
    auth: githubToken, //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
  });
}