import { getUserRepos } from './providers/userRepoProvider';
import { getUserRepoBranches } from './providers/userRepoBranchesProvider';
import UserRepoInfo from '../../interfaces/userRepoInfo.interface';

export const getUserReposInfo = async (user: string) => {
    const userRepos: Record<any, any>[] = await getUserRepos(user);
    const filteredRepos: UserRepoInfo[] = userRepos
        .filter(repo => {
            return !repo.fork;
        })
        .map(repo => ({ reponame: repo.name, ownerlogin: repo.owner.login, branchinfo: [] }));

    const promiseArray: Promise<any>[] = [];
    filteredRepos.forEach(async (element: UserRepoInfo) => {
        const branchDetailsPromise = getUserRepoBranches(user, element.reponame);
        promiseArray.push(branchDetailsPromise);
        branchDetailsPromise.then(data => {
            element.branchinfo = data.map((obj: any) => ({
                name: obj.name,
                lastcommitsha: obj.commit.sha,
            }));
        });
    });
    await Promise.all(promiseArray);
    return filteredRepos;
};
