import { getUserRepos } from '../services/userrepoinfo/providers/userRepoProvider';
import { getUserRepoBranches } from '../services/userrepoinfo/providers/userRepoBranchesProvider';
import { getUserReposInfo } from '../services/userrepoinfo/userRepoInfoController';
import { resolve } from 'dns';

jest.mock('../services/userrepoinfo/providers/userRepoProvider');
jest.mock('../services/userrepoinfo/providers/userRepoBranchesProvider');

describe('userRepoInfoController', () => {
    test('tes for valid user', async () => {
        (getUserRepos as any).mockImplementation(() =>
            JSON.parse(
                '[{"id": 1111,"node_id": "MDEwOlJlcG9zaXRvcnkyMzc4MDM0MTE=","name": "test","full_name": "abhisheksinha86/test","private": false,"owner": {"login": "abhisheksinha86" },"fork": false,"default_branch": "master"}]',
            ),
        );
        const mockGetUserRepoBranchesResp = JSON.parse(
            '[{"name": "master","commit": {"sha": "da53144c39f23a1f28f7869dbf67552075c35cc2","url": "https://api.github.com/repos/abhisheksinha86/node-rest-api/commits/da53144c39f23a1f28f7869dbf67552075c35cc2"},"protected": false}]',
        );
        (getUserRepoBranches as any).mockImplementation(
            () =>
                new Promise((resolve, reject) => {
                    resolve(mockGetUserRepoBranchesResp);
                }),
        );
        const result = await getUserReposInfo('abhisheksinha86');
        await expect(result).toEqual([
            {
                branchinfo: [{ lastcommitsha: 'da53144c39f23a1f28f7869dbf67552075c35cc2', name: 'master' }],
                ownerlogin: 'abhisheksinha86',
                reponame: 'test',
            },
        ]);
    });
});
