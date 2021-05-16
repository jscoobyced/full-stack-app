import { User } from "..";
import { BACK_END_SERVICES_ENDPOINTS, BACK_END_URL } from "../../config/constants";

export interface IUserService {
  getUsers: () => Promise<User[]>
}

export const UserService = (): IUserService => {
  const getUsers = async (): Promise<User[]> => {
    return fetch(`${BACK_END_URL}${BACK_END_SERVICES_ENDPOINTS.getUsers}`).then((data) => {
      return data.json();
    });
  }

  return {
    getUsers
  };
}
