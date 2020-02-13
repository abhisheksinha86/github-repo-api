import BranchInfo from "./BranchInfo.interface";

interface UserRepoInfo {
    reponame: string;
    ownerlogin: string;
    branchinfo: BranchInfo[];
  }

  export default UserRepoInfo;