import { SecureUser, toSecureUser } from "../../../models/user";
import UserService from "../../User";

export default class GoogleUserService extends UserService {
  public createUser = async (googleUser: gapi.auth2.GoogleUser): Promise<SecureUser> => {
    const user = googleUser.getBasicProfile();
    const auth = googleUser.getAuthResponse();
    const secureUser = toSecureUser(0, user.getName(), user.getEmail(), user.getId(), auth.id_token, auth.scope,
      user.getGivenName(), user.getFamilyName(), auth.expires_in, auth.expires_at);
    await this.userLogin(secureUser.user);
    return secureUser;
  };
}
