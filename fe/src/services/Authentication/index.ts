import { SecureUser } from "../../models/user";

export interface UserService {
  createUser: (user: any) => SecureUser;
}
