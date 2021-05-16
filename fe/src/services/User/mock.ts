import { IUserService } from ".";
import { User } from "..";

export const MockUserService = (): IUserService => {
  const getUsers = async (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
      let wait = setTimeout(() => {
        clearTimeout(wait);
        resolve([
          { username: 'John', firstname: 'John', lastname: 'Smith' },
          { username: 'Jane', firstname: 'Jane', lastname: 'Doe' },
          { username: 'Kevin', firstname: 'Kevin', lastname: 'Smith' },
        ]);
      }, 10)
    });
  }

  return {
    getUsers
  };
}
