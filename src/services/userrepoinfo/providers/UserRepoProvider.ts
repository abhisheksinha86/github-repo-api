import request from 'request-promise';

export const getUserRepos = async (user: string) => {
    const options = {
        uri: `https://api.github.com/users/${user}/repos`,
        method: 'GET',
        headers: { 'user-agent': 'Request-Promise' },
    };

    const response = await request(options);
    return JSON.parse(response);
};
