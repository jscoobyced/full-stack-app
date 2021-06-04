import { BACK_END_SERVICES_ENDPOINTS, BACK_END_URL } from "../../config/constants";
import { newSecureUser, SecureUser, User } from "../../models/user";
import { IUserService } from "../Authentication";

export default class UserService implements IUserService {
  public createUser = async (user: any): Promise<SecureUser> => Promise.resolve(newSecureUser());

  public userLogin = async (user: User): Promise<void> => {
    if (!!user && !!user.referenceId) {
      await fetch(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.userLogin}`, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: user.referenceId,
        })
      });
    }
  };
}
