import request from 'request-promise';

export const getUserRepoBranches = async (user: string, repoName: string) => {
    const options = {
        uri: `https://api.github.com/repos/${user}/${repoName}/branches`,
        method: 'GET',
        headers: { 'user-agent': 'Request-Promise' },
    };
    const response = await request(options);
    return JSON.parse(response);
};
