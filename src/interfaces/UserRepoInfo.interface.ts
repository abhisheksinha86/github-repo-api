import BranchInfo from './branchInfo.interface';

interface UserRepoInfo {
    reponame: string;
    ownerlogin: string;
    branchinfo: BranchInfo[];
}

export default UserRepoInfo;
