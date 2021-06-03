import GoogleUserService from ".";

describe('GoogleUserService', () => {
  it('can create a user', async () => {
    const service = new GoogleUserService();
    const user = {
      getName: jest.fn(),
      getEmail: jest.fn(),
      getId: jest.fn(),
      getGivenName: jest.fn(),
      getFamilyName: jest.fn(),
    };
    const auth = {
      id_token: '',
      scope: '',
      expires_in: 1,
      expires_at: 1,
    };
    const googleUser = {
      getBasicProfile: () => user,
      getAuthResponse: () => auth,
    } as unknown as gapi.auth2.GoogleUser;
    service.createUser(googleUser);
    expect(user.getName).toHaveBeenCalledTimes(1);
    expect(user.getEmail).toHaveBeenCalledTimes(1);
    expect(user.getId).toHaveBeenCalledTimes(1);
    expect(user.getGivenName).toHaveBeenCalledTimes(1);
    expect(user.getFamilyName).toHaveBeenCalledTimes(1);
  });
});
