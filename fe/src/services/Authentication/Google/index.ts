import { SecureUser, toSecureUser } from "../../../models/user";
import UserService from "../../User";

export default class GoogleUserService extends UserService {
  public createUser = async (googleUser: gapi.auth2.GoogleUser): Promise<SecureUser> => {
    const user = googleUser.getBasicProfile();
    const auth = googleUser.getAuthResponse();
    const secureUser = toSecureUser({
      id: 0,
      name: user.getName(),
      email: user.getEmail(),
      referenceId: user.getId(),
      firstName: user.getGivenName(),
      lastName: user.getFamilyName()
    }, auth.id_token, auth.scope,
      auth.expires_in, auth.expires_at);
    await this.userLogin(secureUser.user);
    return secureUser;
  };
}
