import { BACK_END_SERVICES_ENDPOINTS, BACK_END_URL } from "../../config/constants";
import { newSecureUser, SecureUser, User } from "../../models/user";
import HttpService from "../../repos/http";
import { IUserService } from "../Authentication";

export default class UserService implements IUserService {
  public createUser = async (user: any): Promise<SecureUser> => Promise.resolve(newSecureUser());

  public userLogin = async (user: User): Promise<void> => {
    if (!!user && !!user.referenceId) {
      await HttpService.postData(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.userLogin}`, {
        uid: user.referenceId,
      });
    }
  };
}
