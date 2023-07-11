import { Octokit } from "octokit";

export function createOctokit(githubToken) {
  return new Octokit({
    auth: githubToken, //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
  });
}