import { getUserRepos } from "./providers/UserRepoProvider";
import { getUserRepoBranches } from "./providers/UserRepoBranchesProvider";
import UserRepoInfo from "../../interfaces/UserRepoInfo.interface";

export const getUserReposInfo = async (user: string) => {

    let userRepos:Record<any, any>[] = await getUserRepos(user);
    const filteredRepos: UserRepoInfo[] = userRepos.filter((repo) => {
        return !repo.fork;
    }).map((repo) => ({reponame: repo.name, ownerlogin: repo.owner.login, branchinfo:[]}));

    const promiseArray: Promise<any>[] = [];
    filteredRepos.forEach(async (element: UserRepoInfo )=> {
        const branchDetailsPromise = getUserRepoBranches(user,element.reponame);
        promiseArray.push(branchDetailsPromise);
        branchDetailsPromise.then((data) => {
            element.branchinfo = data.map((obj: any) => ({name: obj.name, lastcommitsha: obj.commit.sha}));
        })
    });
    await Promise.all(promiseArray);
  return filteredRepos;
};

