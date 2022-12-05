import { getAuthorizationToken, Request } from './index';

describe('getAuthorizationToken', () => {
  it('should throw an error', () => {
    const request = {};
    expect(() => {
      getAuthorizationToken(request as Request);
    }).toThrow('Unauthorized');
  });

  it('should return authorization token', () => {
    const request = { headers: { authorization: 'xxx' } };
    expect(getAuthorizationToken(request as any as Request)).toBe('xxx');
  });
});
