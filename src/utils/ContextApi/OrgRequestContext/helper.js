
export const isRepoPresentInBranch=(selectedReposBranch,RepoName)=>{
    return  selectedReposBranch.find((branch) => branch.repoName === RepoName);
}
        
export const GetReposBranches=(selectedReposBranch,selectedRepos)=>{
   return selectedReposBranch.filter(branch =>
        selectedRepos.some(repo => repo.name === branch.repoName)
      );
}


export const GetNewRepos=(repos)=>{
    return repos.filter((repo, index) => repos.indexOf(repo) === index);
}


export const AddSearchFieldToRepoResponseData=(data)=>{
    return data?.map((item) => {
        return { ...item, searchField: `Name:${item?.name} | Desc:${item?.description}` };
      }) ?? [];
}


export const AddSearchFieldToBranchResponseData=(data,repoName)=>{
    return data?.map((branch) => ({
        ...branch,
        repoName: repoName,
        searchField: `Repo:${repoName} | Branch:${branch.name}`,
      }));
}


export const GetReplaceImageName=(content,imageName)=>{
    return content?.replace(/image: .*?\n/g, `image: ${imageName}\n`);
}