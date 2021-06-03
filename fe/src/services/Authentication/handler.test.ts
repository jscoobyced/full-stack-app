import { waitFor } from "@testing-library/react";
import { mockContext } from "../Context/mock";
import { AuthenticationHandler, AuthenticationProperties } from "./handler";

const { userService } = mockContext();

describe('AuthenticationHandler', () => {
  it('should be initialize the login methods', async () => {
    const doSignIn = jest.fn();
    const doSignOut = jest.fn();
    const properties: AuthenticationProperties = {
      doSignIn,
      doSignOut,
      createUser: userService.createUser,
      userLogin: userService.userLogin,
    };
    const handler = new AuthenticationHandler();
    handler.getLogo();
    handler.init(properties);
    handler.signIn(false);
    handler.signOut(false);
    handler.signIn({
      preventDefault: () => {
        // Intentionally blank
      }
    });
    handler.signOut({
      preventDefault: () => {
        // Intentionally blank
      }
    });
    await waitFor(() => {
      expect(doSignIn).toHaveBeenCalledTimes(2);
      expect(doSignOut).toHaveBeenCalledTimes(2);
    });
  });
});
