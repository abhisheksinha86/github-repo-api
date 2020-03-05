import request from 'request-promise';
import * as Provider from '../services/userrepoinfo/providers/userRepoProvider';

jest.mock('request-promise');

describe('userRepoProvider', () => {
    test('an empty query string', async () => {
        (request as any).mockImplementation(() => '[]');
        const result = await Provider.getUserRepos('abhisheksinha86');
        expect(result).toEqual([]);
    });

    test('an invalid non-json response', async () => {
        (request as any).mockImplementation(() => 'Service Unavailable.');
        expect(Provider.getUserRepos('abhisheksinha86')).rejects.toThrow(SyntaxError);
    });
});
