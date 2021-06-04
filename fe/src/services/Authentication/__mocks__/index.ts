import { IUserService } from "..";
import { SecureUser, toSecureUser, User } from "../../../models/user";

export class UserService implements IUserService {

  public createUser = (user: any): Promise<SecureUser> => {
    this.userLogin(user);
    return Promise.resolve(toSecureUser({
      id: 1,
      name: 'Administrator'
    },
      '',
      '',
      0,
      0,
    ));
  };

  public userLogin = (user: User): Promise<void> => {
    return Promise.resolve();
  }
}
