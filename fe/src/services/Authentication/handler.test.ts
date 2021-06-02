import { newSecureUser } from "../../models/user";
import { AuthenticationHandler, AuthenticationProperties } from "./handler";

describe('AuthenticationHandler', () => {
  it('should be initialize the login methods', () => {
    const doSignIn = jest.fn();
    const doSignOut = jest.fn();
    const properties: AuthenticationProperties = {
      doSignIn,
      doSignOut,
      createUser: (user: any) => newSecureUser(),
    };
    const handler = new AuthenticationHandler();
    handler.init(properties);
    handler.signIn(false);
    handler.signOut(false);
    handler.signIn({ preventDefault: () => { } });
    handler.signOut({ preventDefault: () => { } });
    expect(doSignIn).toHaveBeenCalledTimes(2);
    expect(doSignOut).toHaveBeenCalledTimes(2);
  });
});
