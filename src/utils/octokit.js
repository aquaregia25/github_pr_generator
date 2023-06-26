import { Octokit } from "octokit";

export function createOctokit(githubToken) {
  return new Octokit({
    auth: githubToken, //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
  });
}