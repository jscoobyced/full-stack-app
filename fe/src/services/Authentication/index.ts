import { SecureUser } from "../../models/user";

export interface IUserService {
  createUser: (user: any) => Promise<SecureUser>;
  userLogin: (user: any) => Promise<void>;
}
